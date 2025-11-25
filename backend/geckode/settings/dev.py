from .base import *
from datetime import timedelta

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'geckode',
        'USER': 'django',
        'PASSWORD': 'testing',
        'HOST': 'localhost',
    }
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
    "BLACKLIST_AFTER_ROTATION": True,
    "ROTATE_REFRESH_TOKENS": True,
}

JWT_COOKIE = {
    "name": "refresh",
    "httponly": True,
    "secure": False,
    "samesite": "Strict",
    "max_age": timedelta(days=7),
}

ALLOWED_HOSTS = ['*']

# Redis
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    }
}

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:1234',
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