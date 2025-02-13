import uuid
import pytest
from fastapi.testclient import TestClient
from main import app
from api.auth import get_current_user

client = TestClient(app)

# Mock user with sub="admin-123". Your DB must have a user row with `auth_id="admin-123"`.
def mock_get_current_user():
    return {
        "sub": "admin-123",
        "username": "siteadmin",
        "email": "admin@example.com",
        "photo": "https://example.com/avatar.png",
        "subscriber": True
    }

@pytest.fixture(autouse=True, scope="module")
def override_auth():
    """
    Automatically apply the mock authentication for the entire test module.
    This ensures /space or /location requests are always authenticated
    even inside module-level fixtures like `existing_location`.
    """
    app.dependency_overrides[get_current_user] = mock_get_current_user
    yield
    app.dependency_overrides.clear()

@pytest.fixture(scope="module")
def existing_location():
    """
    Create or reuse a 'test-location' in 'business-relocation' space.
    Because this fixture is module-scoped and override_auth is also module-scoped,
    we are already 'logged in' as admin-123 by the time we hit this code.
    """
    # 1) Ensure the space "business-relocation" exists & is accessible
    space_resp = client.get("/space/business-relocation")
    assert space_resp.status_code == 200, f"Failed to get space: {space_resp.json()}"
    # not storing the space JSON—just ensuring it’s there

    # 2) Check if we already have a location slug "test-location"
    check_resp = client.get("/location/business-relocation/test-location")
    if check_resp.status_code == 200:
        return check_resp.json()  # Already exists

    # 3) Otherwise, create it
    create_resp = client.post(
        "/location/business-relocation",
        json={
            "name": "Test Location",
            "address": "123 Test Street",
            "notes": "Initial test notes",
            "what3words": "test.words.here",
        },
    )
    assert create_resp.status_code == 200, f"Failed to create test location: {create_resp.json()}"
    return create_resp.json()

def test_get_location_by_id(existing_location):
    """Fetch a location by its UUID."""
    resp = client.get(f"/location/id/{existing_location['id']}")
    assert resp.status_code == 200, f"Failed to get location by ID: {resp.json()}"
    data = resp.json()
    assert data["id"] == existing_location["id"]
    assert data["name"] == "Test Location"

def test_get_location_by_slug(existing_location):
    """Fetch a location by space slug and location slug."""
    space_slug = "business-relocation"
    location_slug = existing_location["slug"]

    resp = client.get(f"/location/{space_slug}/{location_slug}")
    assert resp.status_code == 200, f"Failed to get location by slug: {resp.json()}"
    data = resp.json()
    assert data["slug"] == location_slug
    assert data["name"] == existing_location["name"]

def test_create_location():
    """Test creating a new location under /location/{space_slug}."""
    space_slug = "business-relocation"
    # Verify the space is accessible
    space_resp = client.get(f"/space/{space_slug}")
    assert space_resp.status_code == 200, f"Failed to fetch space: {space_resp.json()}"

    create_resp = client.post(
        f"/location/{space_slug}",
        json={
            "name": "New Location",
            "address": "456 New Address",
            "notes": "Some new notes",
            "what3words": "new.words.here",
        },
    )
    assert create_resp.status_code == 200, f"Failed to create location: {create_resp.json()}"
    data = create_resp.json()
    assert data["name"] == "New Location"
    assert data["slug"] == "new-location"

def test_update_location(existing_location):
    """Test updating an existing location."""
    space_slug = "business-relocation"
    location_slug = existing_location["slug"]

    resp = client.patch(
        f"/location/{space_slug}/{location_slug}",
        json={"name": "Updated Location", "address": "789 Updated Address"},
    )
    assert resp.status_code == 200, f"Failed to update location: {resp.json()}"
    data = resp.json()
    assert data["name"] == "Updated Location"
    assert data["address"] == "789 Updated Address"

def test_delete_location(existing_location):
    """Test deleting an existing location."""
    space_slug = "business-relocation"
    location_slug = existing_location["slug"]

    delete_resp = client.delete(f"/location/{space_slug}/{location_slug}")
    assert delete_resp.status_code == 200, f"Failed to delete location: {delete_resp.json()}"
    assert delete_resp.json() == {"message": "Location deleted successfully"}

    delete_resp = client.delete(f"/location/{space_slug}/new-location")
    assert delete_resp.status_code == 200, f"Failed to delete location: {delete_resp.json()}"
    assert delete_resp.json() == {"message": "Location deleted successfully"}

    # Confirm it's gone
    check_resp = client.get(f"/location/{space_slug}/{location_slug}")
    assert check_resp.status_code == 404, f"Location still exists: {check_resp.json()}"
