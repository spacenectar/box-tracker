import pytest
from fastapi.testclient import TestClient
from main import app
from api.auth import get_current_user

# Mock admin user
def mock_admin_user():
    return {
        "sub": "admin-123",
        "username": "siteadmin",
        "email": "admin@example.com",
        "photo": "https://example.com/avatar.png",
        "subscriber": True
    }

# Mock test user
def mock_test_user():
    return {
        "sub": "test-123",
        "username": "testuser",
        "email": "testuser@example.com",
        "photo": "https://example.com/avatar.png",
        "subscriber": False
    }

@pytest.fixture(autouse=True, scope="function")
def reset_dependency_overrides():
    """Ensure FastAPI dependency overrides reset before and after each test."""
    app.dependency_overrides[get_current_user] = mock_test_user
    yield  # Run the test
    app.dependency_overrides[get_current_user] = mock_admin_user  # Reset after test

client = TestClient(app)

def test_create_user():
    """Test creating a new user"""
    user_data = {
        "cognito_id": "test-123",
        "username": "testuser",
        "subscriber": False
    }

    response = client.post("/user", json=user_data)
    assert response.status_code == 200
    created_user = response.json()

    assert created_user["username"] == "testuser"
    assert created_user["cognito_id"] == "test-123"
    assert created_user["subscriber"] is False

def test_get_current_user():
    """Test retrieving the current authenticated user"""
    response = client.get("/user/me")
    assert response.status_code == 200

    user_data = response.json()
    assert user_data["username"] == "testuser"
    assert user_data["cognito_id"] == "test-123"
    assert user_data["email"] == "testuser@example.com"
    assert user_data["photo"] == "https://example.com/avatar.png"

def test_update_user():
    """Rename testuser to renameduser"""
    response = client.patch("/user/testuser", json={"username": "renameduser"})
    assert response.status_code == 200
    assert response.json()["username"] == "renameduser"

def test_get_renamed_user():
    """Ensure the user rename worked"""
    response = client.get("/user/renameduser")
    assert response.status_code == 200
    assert response.json()["username"] == "renameduser"

def test_delete_user():
    """Delete the test user"""
    response = client.delete("/user/renameduser")
    assert response.status_code == 200
    response = client.get("/user/renameduser")
    assert response.status_code == 404

def test_profanity_filter():
    """Ensure that a username with profanity is rejected"""
    user_data = {
        "cognito_id": "test-456",
        "username": "shitstorm",
        "subscriber": False
    }

    response = client.post("/user", json=user_data)
    assert response.status_code == 422  # Pydantic validation should trigger this
    assert "Bad language detected. Aborting." in response.text
