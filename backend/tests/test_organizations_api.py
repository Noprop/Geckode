import pytest

from organizations.models import Organization, OrganizationMember


@pytest.mark.django_db
def test_organizations_list_visibility_and_filtering(
    api_client, user_factory, auth_header_factory
):
    user = user_factory(username="org_user")
    other = user_factory(username="org_other")

    public_org = Organization.objects.create(
        owner=other, slug="public-org", name="PublicOrg", is_public=True
    )
    private_org = Organization.objects.create(
        owner=other, slug="private-org", name="PrivateOrg", is_public=False
    )
    owned_org = Organization.objects.create(owner=user, slug="owned-org", name="OwnedOrg")

    api_client.credentials(**auth_header_factory(user))
    resp = api_client.get("/api/organizations/")
    assert resp.status_code == 200
    ids = {o["id"] for o in resp.data["results"]}
    assert public_org.id in ids
    assert owned_org.id in ids
    assert private_org.id not in ids

    # filter is_public
    resp = api_client.get("/api/organizations/", {"is_public": "true"})
    assert resp.status_code == 200
    ids = {o["id"] for o in resp.data["results"]}
    assert public_org.id in ids
    assert owned_org.id not in ids

    # search
    resp = api_client.get("/api/organizations/", {"search": "Owned"})
    assert resp.status_code == 200
    ids = {o["id"] for o in resp.data["results"]}
    assert owned_org.id in ids
    assert public_org.id not in ids

    # invalid ordering should 400
    resp = api_client.get("/api/organizations/", {"ordering": "nope"})
    assert resp.status_code == 400


@pytest.mark.django_db
def test_organization_join_public(api_client, user_factory, auth_header_factory):
    owner = user_factory(username="org_owner")
    joiner = user_factory(username="org_joiner")
    org = Organization.objects.create(
        owner=owner, slug="join-org", name="JoinOrg", is_public=True
    )

    api_client.credentials(**auth_header_factory(joiner))
    resp = api_client.post(f"/api/organizations/{org.id}/join/")
    assert resp.status_code == 200
    assert OrganizationMember.objects.filter(organization=org, member=joiner).exists()


@pytest.mark.django_db
def test_organization_patch_requires_admin_permission(
    api_client, user_factory, auth_header_factory
):
    owner = user_factory(username="org_owner2")
    admin_member = user_factory(username="org_admin_member")
    viewer_member = user_factory(username="org_viewer_member")

    org = Organization.objects.create(owner=owner, slug="org-admin", name="OrgAdmin")
    org.add_member(admin_member, permission="admin", invited_by=owner)
    org.add_member(viewer_member, permission="view", invited_by=owner)

    api_client.credentials(**auth_header_factory(viewer_member))
    resp = api_client.patch(f"/api/organizations/{org.id}/", {"name": "X"}, format="json")
    assert resp.status_code == 403

    api_client.credentials(**auth_header_factory(admin_member))
    resp = api_client.patch(f"/api/organizations/{org.id}/", {"name": "X"}, format="json")
    assert resp.status_code == 200
    assert resp.data["name"] == "X"


@pytest.mark.django_db
def test_organization_destroy_requires_owner(api_client, user_factory, auth_header_factory):
    owner = user_factory(username="org_owner3")
    admin_member = user_factory(username="org_admin_member2")
    org = Organization.objects.create(owner=owner, slug="org-destroy", name="OrgDestroy")
    org.add_member(admin_member, permission="admin", invited_by=owner)

    api_client.credentials(**auth_header_factory(admin_member))
    resp = api_client.delete(f"/api/organizations/{org.id}/")
    assert resp.status_code == 403

    api_client.credentials(**auth_header_factory(owner))
    resp = api_client.delete(f"/api/organizations/{org.id}/")
    assert resp.status_code == 204


@pytest.mark.django_db
def test_organization_filter_user_has_permission(api_client, user_factory, auth_header_factory):
    owner = user_factory(username="org_owner4")
    member = user_factory(username="org_member4")

    org_manage = Organization.objects.create(owner=owner, slug="org-manage", name="OrgManage")
    org_manage.add_member(member, permission="manage", invited_by=owner)

    org_view = Organization.objects.create(owner=owner, slug="org-view", name="OrgView")
    org_view.add_member(member, permission="view", invited_by=owner)

    api_client.credentials(**auth_header_factory(member))
    resp = api_client.get("/api/organizations/", {"user_has_permission": "invite"})
    assert resp.status_code == 200
    ids = {o["id"] for o in resp.data["results"]}
    assert org_manage.id in ids  # manage satisfies invite in hierarchy
    assert org_view.id not in ids

