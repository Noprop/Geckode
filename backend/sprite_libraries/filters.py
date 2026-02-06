from utils.filters import PrefixedFilterSet
from django_filters import NumberFilter,  CharFilter
from .models import SpriteLibrary, Sprite

class SpriteLibraryFilter(PrefixedFilterSet):
    search_fields = ["name", "project_id"]
    ordering_fields = (
        "id",
        "name",
    )

    name = CharFilter(field_name="name")
    project_id = NumberFilter(field_name="project")

    class Meta:
        model = SpriteLibrary
        fields = []


class SpriteFilter(PrefixedFilterSet):
    search_fields = ["name"]
    ordering_fields = (
        "id",
        "name",
    )

    name = CharFilter(field_name="name")
    sprite_library_id = NumberFilter(field_name="sprite_library__id")

    class Meta:
        model = Sprite
        fields = []