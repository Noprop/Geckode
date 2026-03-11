import pytest

from projects.models import Project, ProjectCollaborator


@pytest.mark.django_db
def test_user_create_requires_password_confirmation(api_client):
    resp = api_client.post(
        "/api/users/",
        {
            "username": "newuser",
            "email": "newuser@example.com",
            "first_name": "N",
            "last_name": "U",
            "password": "pw-test-12345",
        },
        format="json",
    )
    assert resp.status_code == 400
    assert "password" in resp.data or "password2" in resp.data


@pytest.mark.django_db
def test_user_create_works_for_anonymous(api_client):
    resp = api_client.post(
        "/api/users/",
        {
            "username": "newuser2",
            "email": "newuser2@example.com",
            "first_name": "N",
            "last_name": "U",
            "password": "pw-test-12345",
            "password2": "pw-test-12345",
        },
        format="json",
    )
    assert resp.status_code == 201
    assert resp.data["username"] == "newuser2"


@pytest.mark.django_db
def test_user_list_hides_private_fields_for_other_users(
    api_client, user_factory, auth_header_factory
):
    user_a = user_factory(username="ua", email="ua@example.com")
    user_b = user_factory(username="ub", email="ub@example.com")

    api_client.credentials(**auth_header_factory(user_a))
    resp = api_client.get("/api/users/")
    assert resp.status_code == 200

    by_id = {u["id"]: u for u in resp.data["results"]}
    assert by_id[user_a.id].get("email") == "ua@example.com"
    assert "email" not in by_id[user_b.id]
    assert "is_superuser" not in by_id[user_b.id]


@pytest.mark.django_db
def test_user_patch_requires_self_or_superuser(api_client, user_factory, auth_header_factory):
    user_a = user_factory(username="ua2")
    user_b = user_factory(username="ub2")

    api_client.credentials(**auth_header_factory(user_b))
    resp = api_client.patch(f"/api/users/{user_a.id}/", {"first_name": "X"}, format="json")
    assert resp.status_code == 403

    api_client.credentials(**auth_header_factory(user_a))
    resp = api_client.patch(f"/api/users/{user_a.id}/", {"first_name": "X"}, format="json")
    assert resp.status_code == 200
    assert resp.data["first_name"] == "X"


@pytest.mark.django_db
def test_user_filtering_exclude_project(api_client, user_factory, auth_header_factory):
    owner = user_factory(username="p_owner")
    collab = user_factory(username="p_collab")
    other = user_factory(username="p_other")

    project = Project.objects.create(owner=owner, name="P")
    ProjectCollaborator.objects.create(project=project, collaborator=collab, permission="view")

    api_client.credentials(**auth_header_factory(owner))
    resp = api_client.get("/api/users/", {"exclude_project": project.id})
    assert resp.status_code == 200

    ids = {u["id"] for u in resp.data["results"]}
    assert owner.id not in ids
    assert collab.id not in ids
    assert other.id in ids

