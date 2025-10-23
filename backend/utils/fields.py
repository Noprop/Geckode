from rest_framework.serializers import Field, ValidationError

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