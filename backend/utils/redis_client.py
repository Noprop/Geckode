"""
Shared Redis client for Yjs/websocket pubsub and related features.

Use this module from any app (projects, organizations, accounts) so connection
settings and timeouts are centralized. Short timeouts avoid long blocks when
Redis is unavailable (e.g. during development without Redis running).

Use safe_publish() and safe_hkeys() so callers don't need try/except; failures
are logged and no exception is raised.
"""

import logging

from redis import Redis
from redis.backoff import ExponentialBackoff
from redis.retry import Retry

from django.conf import settings


logger = logging.getLogger(__name__)
redis_client = Redis(
    host="localhost",
    port=6379,
    db=0,
    socket_connect_timeout=settings.REDIS_SOCKET_CONNECT_TIMEOUT,
    retry=Retry(ExponentialBackoff(), settings.REDIS_SOCKET_RETRIES),
)


def safe_publish(channel: str, message: str | bytes) -> bool:
    """
    Publish a message to a Redis channel. Returns True on success, False on
    connection/error (logged). Callers can ignore the return value.
    """
    try:
        redis_client.publish(channel, message)
        return True
    except Exception as exc:
        logger.warning("Redis publish failed for channel %s: %s", channel, exc)
        return False


def safe_hkeys(key: str) -> list[bytes]:
    """
    Return Redis hash keys for the given key. Returns [] on connection/error
    (logged). Decode bytes in the caller if needed.
    """
    try:
        return redis_client.hkeys(key)
    except Exception as exc:
        logger.warning("Redis hkeys failed for key %s: %s", key, exc)
        return []
