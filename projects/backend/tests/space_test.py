import pytest
from fastapi.testclient import TestClient
from main import app
from api.auth import get_current_user

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
    app.dependency_overrides[get_current_user] = mock_get_current_user

client = TestClient(app)


@pytest.fixture(scope="module")
def test_user():
    """Retrieve an existing user from seed data"""
    response = client.get("/user/accountadmin")
    print("TEST USER RESPONSE:", response.json())  # Debugging output
    assert response.status_code == 200, f"User not found in seed data: {response.json()}"
    return response.json()


@pytest.fixture
def seeded_spaces():
    """Retrieve existing seeded spaces"""
    response = client.get("/space/london-move")
    assert response.status_code == 200, f"Seeded space not found: {response.json()}"
    return response.json()


# ─── 1. GET TESTS ────────────────────────────────────────────────────────────────

def test_get_space_by_id(seeded_spaces):
    """Ensure a space can be retrieved by its ID"""
    space_id = seeded_spaces["id"]
    response = client.get(f"/space/id/{space_id}")
    assert response.status_code == 200, response.json()
    assert response.json()["name"] == seeded_spaces["name"]


def test_get_space_by_slug(seeded_spaces):
    """Ensure a space can be retrieved by its slug"""
    space_slug = seeded_spaces["slug"]
    response = client.get(f"/space/{space_slug}")
    assert response.status_code == 200, response.json()
    assert response.json()["name"] == seeded_spaces["name"]


# ─── 2. CREATE TEST ──────────────────────────────────────────────────────────────

@pytest.fixture(scope="module")
def created_space(test_user):
    """Create a new space once per test session and reuse it"""
    space_data = {
        "name": "Test Space",
        "slug": "test-space",
        "created_by": test_user["id"]
    }
    response = client.post("/space", json=space_data)

    # If space already exists, retrieve it instead of failing
    if response.status_code == 400 and "Space with this name already exists" in response.json().get("detail", ""):
        response = client.get("/space/test-space")
        assert response.status_code == 200, f"Failed to retrieve existing space: {response.json()}"

    assert response.status_code == 200, response.json()
    return response.json()


def test_create_space(created_space):
    """Ensure a space can be created successfully"""
    assert created_space["name"] == "Test Space"
    assert created_space["slug"] == "test-space"


# ─── 3. UPDATE TEST ──────────────────────────────────────────────────────────────

@pytest.fixture
def updated_space(created_space):
    """Update the name of the created space"""
    space_id = created_space["id"]
    update_data = {"name": "Updated Space"}
    response = client.patch(f"/space/id/{space_id}", json=update_data)
    assert response.status_code == 200, response.json()
    return response.json()


def test_update_space(updated_space):
    """Ensure a space can be updated successfully"""
    assert updated_space["name"] == "Updated Space"


# ─── 4. PERMISSION TEST ─────────────────────────────────────────────────────────

def test_space_permissions(updated_space):
    """Ensure only space_admin can modify/delete spaces"""
    space_id = updated_space["id"]

    def mock_non_admin_user():
        return {
            "sub": "guest-789",
            "username": "regularuser",
            "email": "user@example.com",
            "photo": "https://example.com/avatar.png",
            "subscriber": False
        }

    # Override to use the non-admin user
    app.dependency_overrides[get_current_user] = mock_non_admin_user

    update_data = {"name": "Unauthorized Update"}
    response = client.patch(f"/space/id/{space_id}", json=update_data)
    assert response.status_code == 403, response.json()  # Expecting Forbidden

    response = client.delete(f"/space/id/{space_id}")
    assert response.status_code == 403, response.json()  # Expecting Forbidden

    # Properly reset FastAPI dependencies
    app.dependency_overrides.clear()
    app.dependency_overrides[get_current_user] = mock_get_current_user


# ─── 5. DELETE TEST ─────────────────────────────────────────────────────────────

def test_delete_space(updated_space):
    """Ensure a space can be deleted"""
    space_id = updated_space["id"]
    response = client.delete(f"/space/id/{space_id}")
    assert response.status_code == 200, response.json()

    response = client.get(f"/space/id/{space_id}")
    assert response.status_code == 404, response.json()  # Ensure space no longer exists
