import pytest
from fastapi.testclient import TestClient
from main import app
from api.auth import get_current_user
import uuid

# Override FastAPI dependency
def mock_get_current_user():
    return {
        "sub": "test-123",
        "username": "testuser",
        "email": "testuser@example.com",
        "photo": "https://example.com/avatar.png",
        "subscriber": False
    }

app.dependency_overrides[get_current_user] = mock_get_current_user

client = TestClient(app)


@pytest.fixture
def test_user():
    """Ensure the test user exists and is retrieved"""
    response = client.get("/user/me")

    if response.status_code == 404:  # If the user does not exist, create one
        user_data = {
            "id": "680f46fa-085d-4be1-a6ab-a66a6615dbea",  # Match the seed user
            "cognito_id": "test-123",
            "username": "testuser",
            "staff_role": "admin",
            "subscriber": False,
            "photo": "https://example.com/avatar.png"
        }
        response = client.post("/user", json=user_data)
        assert response.status_code == 201, response.json()

    return response.json()


def test_create_space(test_user):
    """Test creating a new space"""
    space_data = {
        "name": "Test Space",
        "slug": "test-space",
        "created_by": test_user["id"]  # Ensuring it matches the created user
    }

    response = client.post("/space", json=space_data)
    assert response.status_code == 201, response.json()  # Log if fails
    created_space = response.json()

    assert created_space["name"] == "Test Space"
    assert created_space["slug"] == "test-space"
    assert "id" in created_space


def test_get_space_by_id(test_user):
    """Ensure a space can be retrieved by its ID"""
    space_data = {
        "name": "ID Test",
        "slug": "id-test",
        "created_by": test_user["id"]
    }
    response = client.post("/space", json=space_data)
    assert response.status_code == 201
    space_id = response.json()["id"]

    response = client.get(f"/space/id/{space_id}")
    assert response.status_code == 200
    assert response.json()["name"] == "ID Test"


def test_get_space_by_slug(test_user):
    """Ensure a space can be retrieved by its slug"""
    space_data = {
        "name": "Slug Test",
        "slug": "slug-test",
        "created_by": test_user["id"]
    }
    response = client.post("/space", json=space_data)
    assert response.status_code == 201

    response = client.get("/space/slug-test")
    assert response.status_code == 200
    assert response.json()["name"] == "Slug Test"


def test_update_space(test_user):
    """Test updating a space's name"""
    space_data = {
        "name": "Old Space",
        "slug": "old-space",
        "created_by": test_user["id"]
    }
    response = client.post("/space", json=space_data)
    assert response.status_code == 201
    space_id = response.json()["id"]

    update_data = {"name": "Updated Space"}
    response = client.patch(f"/space/id/{space_id}", json=update_data)
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Space"


def test_delete_space(test_user):
    """Test deleting a space"""
    space_data = {
        "name": "Delete Me",
        "slug": "delete-me",
        "created_by": test_user["id"]
    }
    response = client.post("/space", json=space_data)
    assert response.status_code == 201
    space_id = response.json()["id"]

    response = client.delete(f"/space/{space_id}")
    assert response.status_code == 200

    response = client.get(f"/space/id/{space_id}")
    assert response.status_code == 404  # Ensure space no longer exists


def test_space_permissions(test_user):
    """Ensure only space_admin can modify/delete spaces"""
    space_data = {
        "name": "Permission Test",
        "slug": "perm-test",
        "created_by": test_user["id"]
    }
    response = client.post("/space", json=space_data)
    assert response.status_code == 201
    space_id = response.json()["id"]

    # Simulate a non-admin user
    def mock_non_admin_user():
        return {
            "sub": "user-456",
            "username": "regularuser",
            "email": "user@example.com",
            "photo": "https://example.com/avatar.png",
            "subscriber": False
        }

    app.dependency_overrides[get_current_user] = mock_non_admin_user

    update_data = {"name": "Unauthorized Update"}
    response = client.patch(f"/space/id/{space_id}", json=update_data)
    assert response.status_code == 403  # Forbidden

    response = client.delete(f"/space/{space_id}")
    assert response.status_code == 403  # Forbidden

    # Restore admin user
    app.dependency_overrides[get_current_user] = mock_get_current_user
