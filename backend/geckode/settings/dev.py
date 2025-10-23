from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

# Redis
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    }
}