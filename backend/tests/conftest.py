import uuid

import jwt
import pytest
from django.conf import settings
from rest_framework.test import APIClient

from accounts.models import User


@pytest.fixture
def api_client() -> APIClient:
    return APIClient()


@pytest.fixture
def user_factory(db):
    def _create_user(
        *,
        username: str | None = None,
        email: str | None = None,
        password: str = "pw-test-12345",
        first_name: str = "Test",
        last_name: str = "User",
        **extra_fields,
    ) -> User:
        username = username or f"user_{uuid.uuid4().hex[:10]}"
        email = email or f"{username}@example.com"
        return User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            **extra_fields,
        )

    return _create_user


@pytest.fixture
def auth_header_factory():
    def _auth_header_for_user(user: User) -> dict[str, str]:
        token = jwt.encode(
            {"user_id": user.id},
            settings.SECRET_KEY,
            algorithm=settings.JWT_ALGORITHM,
        )
        return {"HTTP_AUTHORIZATION": f"Bearer {token}"}

    return _auth_header_for_user


@pytest.fixture
def auth_client(api_client: APIClient, user_factory, auth_header_factory):
    user = user_factory()
    api_client.credentials(**auth_header_factory(user))
    return api_client, user

