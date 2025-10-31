from rest_framework.serializers import CharField, ModelSerializer, ValidationError
from utils.serializers import create_order_by_choices
from django.contrib.auth.password_validation import validate_password
from .models import User


# for creation
class UserSerializer(ModelSerializer):
    password = CharField(write_only=True, required=False, validators=[validate_password])
    password2 = CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['id', 'created_at', 'username', 'email', 'first_name', 'last_name',
                  'password', 'password2', 'is_staff', 'is_superuser', 'avatar'
                 ]
        read_only_fields = ['created_at', 'is_staff', 'is_superuser']

    def validate(self, attrs):
        view = self.context.get('view')
        action = view.action if view else None

        if action == 'create' and 'password' not in attrs:
            raise ValidationError({'password': 'A password is required.'})

        if 'password' in attrs:
            if not 'password2' in attrs:
                raise ValidationError({'password': 'The re-typed password is required.'})

            if attrs['password'] != attrs['password2']:
                raise ValidationError({'password2': 'Passwords must match.'})

        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)

        view = self.context.get('view')
        action = view.action if view else None

        if action in ['retrieve', 'list']:
            data.pop('created_at', None)
            data.pop('email', None)
            data.pop('is_staff', None)
            data.pop('is_superuser', None)

        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)

        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            avatar=validated_data.get('avatar', ''),
        )

    def update(self, instance, validated_data):
        validated_data.pop('username', None)
        return super().update(instance, validated_data)

# for fetching users
class PublicUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']