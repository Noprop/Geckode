from utils.mixins import PingEnforcementMixin
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json

class CustomAsyncWebsocketConsumer(PingEnforcementMixin, AsyncWebsocketConsumer):
    @database_sync_to_async
    def user_has_access(self):
        return True

    async def connect(self):
        self.user = self.scope['user']

        if self.user.is_anonymous or not await self.user_has_access():
            await self.close(code=401)
            return False

        return True

    async def send_json(self, data):
        await self.send(text_data=json.dumps(data))

    async def disconnect(self, code):
        await self.cleanup_ping_enforcement()

    def validate_message_format(self, message):
        for key in ['type', 'data']:
            if key not in message:
                raise ValueError(f"Missing required key: {key}")

        if message['type'] != 'ping' and not isinstance(message['data'], dict):
            raise ValueError("'data' must be a dictionary")

        return message

    async def receive(self, text_data):
        try:
            message = json.loads(text_data)

            validated_message = self.validate_message_format(message)

            if validated_message['type'] == 'ping':
                self.handle_ping(True)
                return None

            self.handle_ping()

            return validated_message
        except (json.JSONDecodeError, ValueError) as e:
            await self.send_json({
                'error': f"Invalid message format: {str(e)}"
            })