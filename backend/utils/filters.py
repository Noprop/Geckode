from django_filters import FilterSet, CharFilter
from functools import reduce
from operator import or_
from django.db.models import Q

class PrefixedFilterSet(FilterSet):
    search = CharFilter(method='filter_search')
    search_fields = []
    prefix = ''

    def __init__(self, *args, search_fields=None, prefix=None, **kwargs):
        super().__init__(*args, **kwargs)

        if search_fields is not None:
            self.search_fields = search_fields
        if prefix is not None:
            self.prefix = prefix

        for name, filter in self.filters.items():
            if name != 'search':
                filter.field_name = f'{self.prefix}{filter.field_name}'

    def filter_search(self, queryset, name, value):
        print(self.search_fields)
        return queryset.filter(
            reduce(or_, (Q(**{
                f'{self.prefix}{field if type(field) != tuple else '__'.join(field)}__icontains': value
            }) for field in self.search_fields))
        )

def make_owner_id_filter(field_name):
    def filter_method(self, queryset, name, value):
        if value:
            return queryset.filter(**{f'{field_name}__id': value})
        if value == 0:
            return queryset.exclude(**{field_name: self.request.user})
        return queryset
    return filter_method

def make_nullable_boolean_filter(field_name):
    print('test boolean filter')
    def filter_method(self, queryset, name, value):
        print(name, field_name, value)
        if value is not None:
            return queryset.filter(**{f'{field_name}__isnull': not value})
        return queryset
    return filter_method