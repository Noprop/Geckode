import asyncio
from time import time
import json

class PingEnforcementMixin:
    ping_timeout = 30
    ping_check_interval = 5

    def setup_ping_enforcement(self):
        self.last_ping = time()
        self._ping_task = asyncio.create_task(self._ping_watchdog())

    async def cleanup_ping_enforcement(self):
        if hasattr(self, "_ping_task"):
            self._ping_task.cancel()

            try:
                await self._ping_task
            except asyncio.CancelledError:
                pass

    async def _ping_watchdog(self):
        try:
            while True:
                await asyncio.sleep(self.ping_check_interval)

                if time() - self.last_ping > self.ping_timeout:
                    await self.send(text_data=json.dumps({
                        "type": "error",
                        "message": "Ping timeout - connection closed.",
                    }))

                    await self.close()
                    break
        except asyncio.CancelledError:
            pass

    async def handle_ping(self, return_ping=False):
        self.last_ping = time()

        if return_ping:
            await self.send(text_data=json.dumps({"type": "pong"}))