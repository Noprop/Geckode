import base64

import pytest
from django.utils import timezone

from organizations.models import Organization
from projects.models import Project, ProjectCollaborator, ProjectGroup, OrganizationProject


@pytest.mark.django_db
def test_projects_list_respects_access_filters(api_client, user_factory, auth_header_factory):
    user_a = user_factory(username="user_a")
    user_b = user_factory(username="user_b")

    owned_by_a = Project.objects.create(owner=user_a, name="OwnedA")
    owned_by_b_private = Project.objects.create(owner=user_b, name="OwnedBPrivate")
    owned_by_b_published = Project.objects.create(
        owner=user_b, name="OwnedBPublished", published_at=timezone.now()
    )
    ProjectCollaborator.objects.create(
        project=owned_by_b_private, collaborator=user_a, permission="view"
    )

    api_client.credentials(**auth_header_factory(user_a))
    resp = api_client.get("/api/projects/")

    assert resp.status_code == 200
    ids = {p["id"] for p in resp.data["results"]}
    assert owned_by_a.id in ids
    assert owned_by_b_private.id in ids  # collaborator access
    assert owned_by_b_published.id in ids  # published access


@pytest.mark.django_db
def test_projects_filtering_owner_and_search_and_ordering(
    api_client, user_factory, auth_header_factory
):
    user = user_factory(username="filter_user")
    other = user_factory(username="other_user")

    p1 = Project.objects.create(owner=user, name="Alpha Project")
    p2 = Project.objects.create(owner=user, name="Beta Project")
    p3 = Project.objects.create(owner=other, name="Alpha Other", published_at=timezone.now())

    api_client.credentials(**auth_header_factory(user))

    # owner filter
    resp = api_client.get("/api/projects/", {"owner": user.id})
    assert resp.status_code == 200
    ids = {p["id"] for p in resp.data["results"]}
    assert p1.id in ids and p2.id in ids
    assert p3.id not in ids

    # search filter (PrefixedFilterSet adds `search`)
    resp = api_client.get("/api/projects/", {"search": "Alpha"})
    assert resp.status_code == 200
    ids = {p["id"] for p in resp.data["results"]}
    assert p1.id in ids
    assert p2.id not in ids

    # ordering filter
    resp = api_client.get("/api/projects/", {"ordering": "name"})
    assert resp.status_code == 200
    names = [p["name"] for p in resp.data["results"]]
    assert names == sorted(names, key=str.lower)

    # invalid ordering should 400 (utils.filters.PrefixedFilterSet raises ValidationError)
    resp = api_client.get("/api/projects/", {"ordering": "not_a_field"})
    assert resp.status_code == 400


@pytest.mark.django_db
def test_projects_filtering_is_published(api_client, user_factory, auth_header_factory):
    user = user_factory(username="pub_user")
    p_unpub = Project.objects.create(owner=user, name="Unpublished")
    p_pub = Project.objects.create(owner=user, name="Published", published_at=timezone.now())

    api_client.credentials(**auth_header_factory(user))

    resp = api_client.get("/api/projects/", {"is_published": "true"})
    assert resp.status_code == 200
    ids = {p["id"] for p in resp.data["results"]}
    assert p_pub.id in ids
    assert p_unpub.id not in ids

    resp = api_client.get("/api/projects/", {"is_published": "false"})
    assert resp.status_code == 200
    ids = {p["id"] for p in resp.data["results"]}
    assert p_unpub.id in ids
    assert p_pub.id not in ids


@pytest.mark.django_db
def test_projects_filtering_group_and_organization(api_client, user_factory, auth_header_factory):
    user = user_factory(username="group_user")
    api_client.credentials(**auth_header_factory(user))

    group = ProjectGroup.objects.create(owner=user, name="G1")
    org = Organization.objects.create(owner=user, slug="org1", name="Org1")
    org.add_member(user)

    p_grouped = Project.objects.create(owner=user, name="Grouped", group=group)
    p_in_org = Project.objects.create(owner=user, name="InOrg")
    OrganizationProject.objects.create(organization=org, project=p_in_org, permission="view")
    p_none = Project.objects.create(owner=user, name="None")

    resp = api_client.get("/api/projects/", {"group": group.id})
    assert resp.status_code == 200
    ids = {p["id"] for p in resp.data["results"]}
    assert p_grouped.id in ids
    assert p_in_org.id not in ids
    assert p_none.id not in ids

    resp = api_client.get("/api/projects/", {"organization": org.id})
    assert resp.status_code == 200
    ids = {p["id"] for p in resp.data["results"]}
    assert p_in_org.id in ids
    assert p_grouped.id not in ids
    assert p_none.id not in ids


@pytest.mark.django_db
def test_create_project_ignores_is_published_flag(api_client, user_factory, auth_header_factory):
    user = user_factory(username="creator")
    api_client.credentials(**auth_header_factory(user))

    resp = api_client.post(
        "/api/projects/",
        {"name": "Created", "description": "D", "is_published": True},
        format="json",
    )
    assert resp.status_code == 201
    project = Project.objects.get(id=resp.data["id"])
    assert project.owner_id == user.id
    assert project.published_at is None


@pytest.mark.django_db
def test_partial_update_permissions_for_code_vs_admin(api_client, user_factory, auth_header_factory):
    owner = user_factory(username="owner")
    coder = user_factory(username="coder")
    viewer = user_factory(username="viewer")

    project = Project.objects.create(owner=owner, name="P", description="D")
    ProjectCollaborator.objects.create(project=project, collaborator=coder, permission="code")
    ProjectCollaborator.objects.create(project=project, collaborator=viewer, permission="view")

    # code collaborator can change name (allowed)...
    api_client.credentials(**auth_header_factory(coder))
    resp = api_client.patch(f"/api/projects/{project.id}/", {"name": "P2"}, format="json")
    assert resp.status_code == 200

    # ...but cannot change non-state fields like description unless admin
    resp = api_client.patch(
        f"/api/projects/{project.id}/", {"description": "D2"}, format="json"
    )
    assert resp.status_code == 403

    # view collaborator can't patch at all (permission class requires code)
    api_client.credentials(**auth_header_factory(viewer))
    resp = api_client.patch(f"/api/projects/{project.id}/", {"name": "P3"}, format="json")
    assert resp.status_code == 403


@pytest.mark.django_db
def test_destroy_requires_owner(api_client, user_factory, auth_header_factory):
    owner = user_factory(username="owner2")
    other = user_factory(username="other2")
    project = Project.objects.create(owner=owner, name="P")
    ProjectCollaborator.objects.create(project=project, collaborator=other, permission="admin")

    api_client.credentials(**auth_header_factory(other))
    resp = api_client.delete(f"/api/projects/{project.id}/")
    assert resp.status_code == 403

    api_client.credentials(**auth_header_factory(owner))
    resp = api_client.delete(f"/api/projects/{project.id}/")
    assert resp.status_code == 204


@pytest.mark.django_db
def test_fork_creates_new_project_owned_by_requester(api_client, user_factory, auth_header_factory):
    owner = user_factory(username="fork_owner")
    forker = user_factory(username="forker")
    project = Project.objects.create(
        owner=owner, name="ToFork", published_at=timezone.now(), description="X"
    )

    api_client.credentials(**auth_header_factory(forker))
    before = Project.objects.count()
    resp = api_client.post(f"/api/projects/{project.id}/fork/")
    assert resp.status_code == 200
    assert Project.objects.count() == before + 1

    forked = Project.objects.order_by("-id").first()
    assert forked is not None
    assert forked.owner_id == forker.id
    assert forked.group_id is None
    assert forked.published_at is None
    assert forked.name.endswith(" - Fork")


@pytest.mark.django_db
def test_check_user_permission_returns_effective_permission(
    api_client, user_factory, auth_header_factory
):
    owner = user_factory(username="perm_owner")
    coder = user_factory(username="perm_coder")
    project = Project.objects.create(owner=owner, name="P")
    ProjectCollaborator.objects.create(project=project, collaborator=coder, permission="code")

    api_client.credentials(**auth_header_factory(owner))
    resp = api_client.get(f"/api/projects/{project.id}/check-user-permission/")
    assert resp.status_code == 200
    assert resp.data["permission"] == "owner"

    api_client.credentials(**auth_header_factory(coder))
    resp = api_client.get(f"/api/projects/{project.id}/check-user-permission/")
    assert resp.status_code == 200
    assert resp.data["permission"] == "code"


@pytest.mark.django_db
def test_project_list_omits_state_fields(api_client, user_factory, auth_header_factory):
    user = user_factory(username="state_user")
    blob = b"hello"
    project = Project.objects.create(owner=user, name="P", yjs_blob=blob)

    api_client.credentials(**auth_header_factory(user))
    resp = api_client.get("/api/projects/")
    assert resp.status_code == 200
    result = next(p for p in resp.data["results"] if p["id"] == project.id)
    assert "yjs_blob" not in result


@pytest.mark.django_db
def test_public_share_link_endpoint_returns_base64_blob(api_client, user_factory):
    owner = user_factory(username="share_owner")
    project = Project.objects.create(owner=owner, name="P", yjs_blob=b"blob")
    from projects.models import ProjectShareLink

    share = ProjectShareLink.objects.create(project=project, name="S", token="tok", yjs_blob=b"blob")

    resp = api_client.get(f"/api/share/{share.token}/", {"visitor_id": "v1"})
    assert resp.status_code == 200
    assert resp.json()["token"] == share.token
    assert resp.json()["yjs_blob"] == base64.b64encode(b"blob").decode("ascii")

