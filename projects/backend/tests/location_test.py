import uuid
import pytest
from fastapi.testclient import TestClient
from main import app
from api.auth import get_current_user  # Ensure we import this!

client = TestClient(app)

# Override FastAPI dependency
def mock_get_current_user():
    return {
        "sub": "admin-123",
        "username": "siteadmin",
        "email": "admin@example.com",
        "photo": "https://example.com/avatar.png",
        "subscriber": True
    }

@pytest.fixture(autouse=True, scope="function")
def reset_dependency_overrides():
    """Ensure FastAPI dependency overrides reset between tests."""
    yield  # Run the test
    app.dependency_overrides.clear()
    app.dependency_overrides[get_current_user] = mock_get_current_user  # Restore admin user


@pytest.fixture(scope="module")
def existing_location():
    """Fixture to create a location through the API once per test session."""
    space_response = client.get("/space/business-relocation")
    assert space_response.status_code == 200, f"Failed to get space: {space_response.json()}"

    space = space_response.json()

    # Check if the location already exists before creating it
    location_check = client.get(f"/location/{space['slug']}/test-location")
    if location_check.status_code == 200:
        return location_check.json()

    response = client.post(
        "/location/",
        json={
            "space_id": space["id"],
            "name": "Test Location",
            "address": "123 Test Street",
            "notes": "Initial test notes",
            "what3words": "test.words.here",
        },
    )

    assert response.status_code == 200, f"Failed to create location: {response.json()}"
    return response.json()


def test_get_location_by_id(existing_location):
    """Test fetching a location by its UUID"""
    response = client.get(f"/location/{existing_location['id']}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == existing_location["id"]
    assert data["name"] == "Test Location"


def test_get_location_by_slug(existing_location):
    """Test fetching a location by space slug and location slug"""
    space_slug = "business-relocation"
    location_slug = existing_location["slug"]

    response = client.get(f"/location/{space_slug}/{location_slug}")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == location_slug
    assert data["name"] == "Test Location"


def test_create_location():
    """Test creating a new location via the API"""
    space_response = client.get("/space/business-relocation")
    assert space_response.status_code == 200, f"Failed to fetch space: {space_response.json()}"

    space = space_response.json()
    response = client.post(
        "/location/",
        json={
            "space_id": space["id"],
            "name": "New Location",
            "address": "456 New Address",
            "notes": "Some new notes",
            "what3words": "new.words.here",
        },
    )
    assert response.status_code == 200, f"Failed to create location: {response.json()}"
    data = response.json()
    assert data["name"] == "New Location"
    assert data["slug"] == "new-location"


def test_update_location(existing_location):
    """Test updating an existing location"""
    space_slug = "business-relocation"
    location_slug = existing_location["slug"]

    response = client.patch(
        f"/location/{space_slug}/{location_slug}",
        json={"name": "Updated Location", "address": "789 Updated Address"},
    )
    assert response.status_code == 200, f"Failed to update location: {response.json()}"
    data = response.json()
    assert data["name"] == "Updated Location"
    assert data["address"] == "789 Updated Address"


# TODO: I've commented this out for now as I'm going to replace this functionality with a more robust solution
# def test_location_permissions(existing_location):
#     """Ensure a non-admin user cannot modify or delete a location"""
#     space_slug = "business-relocation"
#     location_slug = existing_location["slug"]

#     # Simulate a non-admin user
#     def mock_non_admin_user():
#         return {
#             "sub": "guest-789",
#             "username": "regularuser",
#             "email": "user@example.com",
#             "photo": "https://example.com/avatar.png",
#             "subscriber": False,
#         }

#     app.dependency_overrides[get_current_user] = mock_non_admin_user

#     response = client.patch(f"/location/{space_slug}/{location_slug}", json={"name": "Unauthorized Update"})
#     assert response.status_code == 403, f"Expected 403 Forbidden: {response.json()}"

#     response = client.delete(f"/location/{space_slug}/{location_slug}")
#     assert response.status_code == 403, f"Expected 403 Forbidden: {response.json()}"

#     # Properly reset FastAPI dependencies
#     app.dependency_overrides.clear()
#     app.dependency_overrides[get_current_user] = mock_get_current_user


def test_delete_location(existing_location):
    """Test deleting an existing location"""
    space_slug = "business-relocation"
    location_slug = existing_location["slug"]

    response = client.delete(f"/location/{space_slug}/{location_slug}")
    assert response.status_code == 200, f"Failed to delete location: {response.json()}"
    assert response.json() == {"message": "Location deleted successfully"}

    # Ensure it no longer exists
    response = client.get(f"/location/{space_slug}/{location_slug}")
    assert response.status_code == 404, f"Location still exists after deletion: {response.json()}"
