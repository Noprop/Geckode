import json
from django.core.management.base import BaseCommand
from utils.redis_client import redis_client, safe_publish
from projects.models import Project

PROJECT_SAVED_CHANNEL = "yjs:project_saved"
UPDATES_PENDING_SET_KEY = "yjs:updates_pending"

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.stdout.write("Yjs-Django Sync Worker started...")

        while True:
            try:
                result = redis_client.blpop("yjs:updates_queue", timeout=3)

                if not result:
                    continue

                id = result[1].decode()
                data = redis_client.hgetall(f"yjs:buffer:{id}")

                if data:
                    saved_ok = False
                    try:
                        project = Project.objects.get(id=id)
                        project.yjs_blob = data[b"blob"]

                        project_name = data[b"name"] if b"name" in data else None
                        if project_name:
                            decoded_name = project_name.decode("utf-8")
                            project.name = decoded_name

                        # Mark this save as originating from Yjs so the signals
                        # layer can skip broadcasting it back to Hocuspocus.
                        project._skip_hocuspocus_notify = True
                        project.save()
                        saved_ok = True
                    except Project.DoesNotExist:
                        pass

                    # Always clear buffer after handling to avoid stale replays; publish "saved" only on success.
                    redis_client.delete(f"yjs:buffer:{id}")

                    # Allow future queueing for this project id.
                    redis_client.srem(UPDATES_PENDING_SET_KEY, id)
                    if saved_ok:
                        safe_publish(
                            PROJECT_SAVED_CHANNEL,
                            json.dumps({"project_id": int(id)}),
                        )
            except KeyboardInterrupt:
                break
