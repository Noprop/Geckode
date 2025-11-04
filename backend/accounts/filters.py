from utils.filters import PrefixedFilterSet
from .models import User

class UserFilter(PrefixedFilterSet):
    search_fields = User.SEARCH_FIELDS
    ordering_fields = [
        'id',
        *search_fields,
    ]

    class Meta:
        model = User
        fields = []