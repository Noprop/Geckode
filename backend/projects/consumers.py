from utils.consumers import CustomAsyncWebsocketConsumer
from channels.db import database_sync_to_async
from utils.group_users import add_user_to_group, get_group_users, remove_user_from_group
import asyncio
from accounts.serializers import PublicUserSerializer
from accounts.models import User
from .models import Project

class ProjectConsumer(CustomAsyncWebsocketConsumer):
    @database_sync_to_async
    def user_has_access(self):
        try:
            return Project.objects.get(id=self.id).has_permission(self.user, 'view', published_gives_permission=False)
        except Project.DoesNotExist:
            return False

    def setup_autosave(self):
        group_users = get_group_users(self.room_group_name)

        if not hasattr(self, 'autosave_task') and group_users[0] == self.user.id:
            self.autosave_interval = 30
            self.autosave_task = asyncio.create_task(self.autosave_watchdog())

    async def autosave_watchdog(self):
        try:
            while True:
                await asyncio.sleep(self.autosave_interval)
                await self.send_json({
                    'type': 'project_autosave',
                })
        except asyncio.CancelledError:
            pass

    async def clean_autosave(self):
        if hasattr(self, "autosave_task"):
            self.autosave_task.cancel()

            try:
                await self.autosave_task
            except asyncio.CancelledError:
                pass

    @database_sync_to_async
    def get_serialized_users(self):
        return PublicUserSerializer(User.objects.filter(id__in=get_group_users(self.room_group_name)), many=True).data

    async def group_send(self, message):
        await self.channel_layer.group_send(self.room_group_name, message)

    async def connect(self):
        self.id = self.scope['url_route']['kwargs']['id']
        self.room_group_name = f'project_{self.id}'

        if not await super().connect():
            return

        add_user_to_group(self.room_group_name, self.user.id)

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

        # Uncomment this to enforce client pinging every so often
        # self.setup_ping_enforcement()

        self.setup_autosave()

        await self.group_send({
            'type': 'user_connect',
            'user': PublicUserSerializer(self.user).data
        })

        users = await self.get_serialized_users()

        await self.send_json({
            'type': 'user_list',
            'data': users,
        })

    async def disconnect(self, code):
        await super().disconnect(code)

        if not hasattr(self, 'room_group_name'):
            return

        await self.clean_autosave()

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

        remove_user_from_group(self.room_group_name, self.user.id)

        await self.group_send({
            'type': 'user_disconnect',
            'user_id': self.user.id,
        })

    async def receive(self, text_data):
        message = await super().receive(text_data)

        if message is None:
            return

        if message['type'][:6] == 'block_':
            await self.group_send({
                'type': 'handle_block_event',
                'user_id': self.user.id,
                'data': message,
            })

    async def user_connect(self, event):
        if self.user.id == event['user']['id']:
            return

        await self.send_json({
            'type': 'user_connect',
            'data': event['user'],
        })

    async def user_disconnect(self, event):
        self.setup_autosave()

        await self.send_json({
            'type': 'user_disconnect',
            'data': event['user_id'],
        })

    async def handle_block_event(self, event):
        if self.user.id == event['user_id']:
            return

        await self.send_json(event['data'])