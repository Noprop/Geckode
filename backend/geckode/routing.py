from django.urls import re_path
from projects.consumers import ProjectConsumer

websocket_urlpatterns = [
    re_path(r'^ws/projects/(?P<id>\w+)/$', ProjectConsumer.as_asgi()),
]