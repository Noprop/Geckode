from __future__ import annotations
from django.db.models import DateTimeField, CharField, EmailField, BooleanField, ImageField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator
import random
import string

def user_avatar_path(_instance, filename):
    characters = string.ascii_letters + string.digits + string.punctuation
    random_string = ''.join(random.choices(characters, k=20))
    file_ext = filename.split('.')[-1]
    return f"avatars/{random_string}.{file_ext}"

class UserManager(BaseUserManager):
    def create_user(self, username : str, email : str, password : str|None = None, **extra_fields) -> User :
        if not email:
            raise ValueError('Users must have an email address.')
        email = self.normalize_email(email)
        user : User = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username : str, email : str, password : str|None = None, **extra_fields) -> User :
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)

class User(AbstractBaseUser):
    created_at = DateTimeField(auto_now_add=True)
    username = CharField(max_length=100, unique=True, validators=[
        RegexValidator(
            regex=r'^[a-zA-Z0-9_.-]+$',
            message="Username may only contain letters, numbers, dots, hyphens, and underscores."
        ),
    ])
    email = EmailField(max_length=150, unique=True)
    first_name = CharField(max_length=50)
    last_name = CharField(max_length=50)
    password = CharField(max_length=255)
    is_staff = BooleanField(default=False)
    is_superuser = BooleanField(default=False)
    avatar = ImageField(upload_to=user_avatar_path, blank=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'password']
    SEARCH_FIELDS = ['username', 'first_name', 'last_name']

    objects = UserManager()

    def __str__(self) -> str:
        return self.username

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
