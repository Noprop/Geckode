from django.db.models import DateTimeField, CharField, EmailField, BooleanField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import RegexValidator

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address.')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
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

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'password']

    objects = UserManager()

    def __str__(self):
        return self.username

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser