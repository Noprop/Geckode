from utils.filters import PrefixedFilterSet
from django_filters import OrderingFilter
from .models import User

class UserFilter(PrefixedFilterSet):
    search_fields = User.SEARCH_FIELDS

    order_by = OrderingFilter(
        fields=(
            'id',
            *search_fields,
        ),
    )

    class Meta:
        model = User
        fields = []