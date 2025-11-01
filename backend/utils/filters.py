from django_filters import FilterSet, CharFilter
from functools import reduce
from operator import or_
from django.db.models import Q

'''
Custom FilterSet class used to standardize certain search filters and add an optional prefix
The parameter 'search' is automatically added and simply pass 'search_fields' into the subclass to filter the model objects based on the field
A class 'prefix' optionally allows all searches and fields (even those defined in the subclass) to be prefixed (useful for a relational filter)
'''
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

'''
Custom owner ID field creator
If the ID passed is greater than 0, the query is filtered to that owner
If the ID passed is 0, the query is filtered to exclude the requesting user as owner (useful for finding stuff not owned by the user)
Does not force an ID to be passed, can be present without an ID and not affect the queryset
'''
def make_owner_id_filter(field_name):
    def filter_method(self, queryset, name, value):
        if value:
            return queryset.filter(**{f'{field_name}__id': value})
        if value == 0:
            return queryset.exclude(**{field_name: self.request.user})
        return queryset
    return filter_method

'''
Custom nullable boolean field creator
Allows a boolean parameter to be converted to an isnull check in the model filtering
Ex: You can pass the field name 'published_at' (null or datetime) and use a boolean parameter to filter if it is null or not
'''
def make_nullable_boolean_filter(field_name):
    def filter_method(self, queryset, name, value):
        print(name, field_name, value)
        if value is not None:
            return queryset.filter(**{f'{field_name}__isnull': not value})
        return queryset
    return filter_method