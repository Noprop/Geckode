from rest_framework.pagination import PageNumberPagination
from django.db.models.query import QuerySet
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Model
from rest_framework.serializers import ModelSerializer
from django.core.paginator import Page

class DynamicMetadataPagination(PageNumberPagination):
    SELECTIONS_VIEW_KEY = 'selection_fields'
    SELECTIONS_RESPONSE_KEY = 'selections'

    def paginate_queryset(self, queryset: QuerySet, request: Request, view: APIView=None) -> list[Page]:
        page: Page = super().paginate_queryset(queryset, request, view)
        self.metadata = {
            self.SELECTIONS_RESPONSE_KEY: {}
        }

        if not (view and hasattr(view, self.SELECTIONS_VIEW_KEY)):
            return page

        for field_name, conf in getattr(view, self.SELECTIONS_VIEW_KEY).items():
            ModelClass: Model = conf['model']
            SerializerClass: ModelSerializer = conf['serializer']

            distinct_ids = queryset.values_list(field_name, flat=True).distinct()

            related_objects = ModelClass.objects.filter(id__in=distinct_ids)
            serialized_data = SerializerClass(related_objects, many=True).data

            self.metadata[self.SELECTIONS_RESPONSE_KEY][field_name] = serialized_data

        return page

    def get_paginated_response(self, data) -> Response:
        response_data = {
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        }

        response_data.update(self.metadata)

        return Response(response_data)