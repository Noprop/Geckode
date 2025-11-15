from .base import *

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

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000'
]


CORS_ALLOW_CREDENTIALS = True

SESSION_COOKIE_SAMESITE = 'Strict'
SESSION_COOKIE_SECURE = False
SESSION_COOKIE_HTTPONLY = True

CSRF_COOKIE_SAMESITE = 'Strict'
CSRF_COOKIE_SECURE = False
CSRF_COOKIE_HTTPONLY = False