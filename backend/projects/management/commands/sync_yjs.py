from redis import Redis
from django.core.management.base import BaseCommand
from projects.models import Project

class Command(BaseCommand):
    def handle(self, *args, **options):
        r = Redis(host='localhost', port=6379, db=0)
        self.stdout.write("Yjs-Django Sync Worker started...")

        while True:
            _, doc_name = r.blpop('yjs:updates_queue')
            id = doc_name.decode()
            data = r.hgetall(f"yjs:buffer:{id}")

            if data:
                try:
                    project = Project.objects.get(id=id)
                    project.yjs_blob = data[b'blob']

                    project_name = data[b'name'] if b'name' in data else None
                    if project_name:
                        project.name = project_name.decode('utf-8')

                    project.save()

                    print("Saving redis yjs sync", id)
                except Project.DoesNotExist:
                    pass

                r.delete(f"yjs:buffer:{id}")