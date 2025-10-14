from rest_framework.serializers import PrimaryKeyRelatedField
from rest_framework.relations import PKOnlyObject
from .serializers import PublicUserSerializer

class ReadNestedWriteIDUserField(PrimaryKeyRelatedField):
    def to_representation(self, value):
        if isinstance(value, PKOnlyObject):
            return value.pk
        return PublicUserSerializer(value).data