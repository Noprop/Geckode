from rest_framework.serializers import Field, ValidationError
from base64 import b64encode, b64decode

class NullableBooleanField(Field):
    def to_internal_value(self, data):
        if data in [True, 'true', 'True', '1', 1]:
            return True
        if data in [False, 'false', 'False', '0', 0]:
            return False
        if data is None or data == '':
            raise ValidationError('This field may be null or omitted')
        raise ValidationError('Invalid boolean value')

    def to_representation(self, value):
        return value

class Base64BinaryField(Field):
    def to_representation(self, value):
        return b64encode(value).decode('utf-8')

    def to_internal_value(self, data):
        try:
            return b64decode(data)
        except TypeError:
            raise ValidationError("Invalid Base64 string.")