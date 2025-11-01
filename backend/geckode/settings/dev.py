from .base import *
import os

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


DEBUG = True

ALLOWED_HOSTS = ['*']

# Redis
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    }
}

