from utils.filters import PrefixedFilterSet
from django_filters import OrderingFilter
from .models import User

from rest_framework.filters import BaseFilterBackend
from .serializers import UserSearchSerializer
from django.db.models import Q

class UserSearchFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        serializer = UserSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        params = serializer.validated_data

        if 'search' in params:
            queryset = queryset.filter(
                Q(username__icontains=params['search']) |
                Q(first_name__icontains=params['search']) |
                Q(last_name__icontains=params['search'])
            )

        return queryset.order_by(params['order_by'])

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