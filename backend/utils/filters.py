from django_filters import FilterSet, CharFilter
from functools import reduce
from operator import or_
from django.db.models import Q, CharField, TextField, F
from django.db.models.functions import Lower
from rest_framework.exceptions import ValidationError

'''
Custom FilterSet class used to standardize certain search filters and add an optional prefix
The parameter 'search' is automatically added and simply pass 'search_fields' into the subclass to filter the model objects based on the field
A class 'prefix' optionally allows all searches and fields (even those defined in the subclass) to be prefixed (useful for a relational filter)
'''
class PrefixedFilterSet(FilterSet):
    search_fields = []
    ordering_fields = []
    prefix = ''

    search = CharFilter(method='filter_search')
    ordering = CharFilter(method='filter_ordering')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name, filter in list(self.filters.items()):
            self.filters[f"{self.prefix}{field_name}"] = filter

        # Store ordering fields as param_value: internal_order_by_key
        self.ordering_fields = {
            (field[1] if isinstance(field, tuple) else field): 
            (field[0] if isinstance(field, tuple) else field)
            for field in self.ordering_fields
        }

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            reduce(or_, (Q(**{
                f'{self.prefix}{field if type(field) != tuple else '__'.join(field)}__icontains': value
            }) for field in self.search_fields))
        )

    def filter_ordering(self, queryset, name, value):
        fields = value.split(',')

        for i, field in enumerate(fields):
            if field[:1] in ['-', '+']:
                ordering_prefix = field[0]
                field = field[1:]
            else:
                ordering_prefix = ''

            if field not in self.ordering_fields:
                raise ValidationError({name: f'Select a valid choice. {field} is not one of the available choices.'})

            fields[i] = (ordering_prefix, self.ordering_fields[field])

        order_expressions = []

        for ordering_prefix, field_name in fields:
            full_field_name = f'{self.prefix}{field_name}'

            # This makes text ordering non-case-sensitive
            try:
                field = queryset.model._meta.get_field(full_field_name)
                if isinstance(field, (CharField, TextField)):
                    expr = Lower(F(full_field_name))
                else:
                    expr = full_field_name
            except Exception:
                expr = full_field_name

            if ordering_prefix == '-':
                expr = expr.desc() if hasattr(expr, 'desc') else f'-{expr}'
            elif ordering_prefix == '':
                expr = expr.asc() if hasattr(expr, 'asc') else expr

            order_expressions.append(expr)

        return queryset.order_by(*order_expressions)

'''
Custom owner ID field creator
If the ID passed is greater than 0, the query is filtered to that owner
If the ID passed is 0, the query is filtered to exclude the requesting user as owner (useful for finding stuff not owned by the user)
Does not force an ID to be passed, can be present without an ID and not affect the queryset
'''
def make_owner_id_filter(field_name):
    def filter_method(self, queryset, name, value):
        prefix = getattr(self, 'prefix', '')

        if value:
            return queryset.filter(**{f'{prefix}{field_name}__id': value})
        if value == 0:
            return queryset.exclude(**{f'{prefix}{field_name}': self.request.user})
        return queryset

    return filter_method

'''
Custom nullable boolean field creator
Allows a boolean parameter to be converted to an isnull check in the model filtering
Ex: You can pass the field name 'published_at' (null or datetime) and use a boolean parameter to filter if it is null or not
'''
def make_nullable_boolean_filter(field_name):
    def filter_method(self, queryset, name, value):
        prefix = getattr(self, 'prefix', '')

        if value is not None:
            return queryset.filter(**{f'{prefix}{field_name}__isnull': not value})
        return queryset

    return filter_method