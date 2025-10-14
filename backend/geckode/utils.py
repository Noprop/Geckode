from geckode.settings import REST_FRAMEWORK
from rest_framework.pagination import PageNumberPagination

def create_custom_pagination_class(**kwargs):
    defaults = {
        'page_size': REST_FRAMEWORK['PAGE_SIZE'],
        'page_size_query_param': 'limit',
        'page_query_param': 'page_number',
        'max_page_size': 100,
    }

    class CustomPagination(PageNumberPagination):
        pass

    for key, value in {**defaults, **kwargs}.items():
        setattr(CustomPagination, key, value)

    return CustomPagination