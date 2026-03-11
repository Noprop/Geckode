from types import SimpleNamespace

import pytest
from rest_framework.test import APIRequestFactory
from rest_framework.request import Request

from accounts.serializers import PublicUserSerializer
from organizations.models import Organization, OrganizationInvitation
from projects.models import Project
from utils.pagination import DynamicMetadataPagination
from utils.permissions import AnyOf, create_permissions_allowed_hierarchy, create_user_permission_class
from projects.filters import ProjectFilter


@pytest.mark.django_db
def test_create_permissions_allowed_hierarchy():
    perms = [("view", "v"), ("code", "c"), ("admin", "a")]
    hier = create_permissions_allowed_hierarchy(perms)
    assert hier["view"] == ["view", "code", "admin"]
    assert hier["code"] == ["code", "admin"]
    assert hier["admin"] == ["admin"]


def test_anyof_composes_permissions():
    class Deny:
        def has_permission(self, request, view):
            return False

        def has_object_permission(self, request, view, obj):
            return False

    class Allow:
        def has_permission(self, request, view):
            return True

        def has_object_permission(self, request, view, obj):
            return True

    anyof = AnyOf(Deny(), Allow())
    req = SimpleNamespace()
    view = SimpleNamespace()
    obj = object()
    assert anyof.has_permission(req, view) is True
    assert anyof.has_object_permission(req, view, obj) is True


@pytest.mark.django_db
def test_create_user_permission_class_primary_pk_checks_model_has_permission(
    user_factory,
):
    owner = user_factory(username="perm_owner_x")
    other = user_factory(username="perm_other_x")
    org = Organization.objects.create(owner=owner, slug="org-perm-x", name="OrgPermX")
    org.add_member(other, permission="view", invited_by=owner)

    Permission = create_user_permission_class("view", primary_pk_class=Organization, lookup="pk")

    req = SimpleNamespace(user=other)
    view = SimpleNamespace(kwargs={"pk": str(org.id)})

    assert Permission().has_permission(req, view) is True


@pytest.mark.django_db
def test_create_user_permission_class_user_override_fields_allows_invitee_delete(
    user_factory,
):
    owner = user_factory(username="inv_owner")
    invitee = user_factory(username="inv_invitee")
    inviter = user_factory(username="inv_inviter")
    org = Organization.objects.create(owner=owner, slug="org-inv", name="OrgInv")
    inv = OrganizationInvitation.objects.create(
        organization=org, invitee=invitee, inviter=inviter, permission="view"
    )

    Permission = create_user_permission_class(
        "manage",
        user_override_fields=["invitee"],
        primary_pk_class=Organization,
        lookup="organization_pk",
        secondary_pk_class=OrganizationInvitation,
        secondary_pk_kwargs={"id": inv.id},
    )

    req = SimpleNamespace(user=invitee)
    view = SimpleNamespace(kwargs={"organization_pk": str(org.id), "pk": str(inv.id)})
    assert Permission().has_permission(req, view) is True


@pytest.mark.django_db
def test_project_filter_owner_zero_excludes_request_user(user_factory):
    user = user_factory(username="owner0_user")
    other = user_factory(username="owner0_other")
    p1 = Project.objects.create(owner=user, name="Mine")
    p2 = Project.objects.create(owner=other, name="Other")

    request = SimpleNamespace(user=user)
    f = ProjectFilter(data={"owner": 0}, queryset=Project.objects.all(), request=request)
    ids = set(f.qs.values_list("id", flat=True))
    assert p1.id not in ids
    assert p2.id in ids


@pytest.mark.django_db
def test_dynamic_metadata_pagination_includes_selections(user_factory):
    user_a = user_factory(username="sel_a")
    user_b = user_factory(username="sel_b")
    Project.objects.create(owner=user_a, name="A")
    Project.objects.create(owner=user_b, name="B")

    factory = APIRequestFactory()
    request = Request(factory.get("/api/projects/?limit=10"))

    class DummyView:
        selection_fields = {
            "owner": {
                "model": type(user_a),
                "serializer": PublicUserSerializer,
            }
        }

    paginator = DynamicMetadataPagination()
    page = paginator.paginate_queryset(Project.objects.all().order_by("id"), request, DummyView())
    response = paginator.get_paginated_response([{"id": obj.id} for obj in page])

    assert "selections" in response.data
    owners = response.data["selections"]["owner"]
    owner_ids = {o["id"] for o in owners}
    assert user_a.id in owner_ids
    assert user_b.id in owner_ids

