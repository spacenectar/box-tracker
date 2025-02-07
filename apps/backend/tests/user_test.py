import pytest
from fastapi.testclient import TestClient
from main import app
from api.auth import get_current_user

client = TestClient(app)

# ✅ Override FastAPI dependency
def mock_get_current_user():
    return {"sub": "test_user"}

app.dependency_overrides[get_current_user] = mock_get_current_user

def test_get_user():
    """Test fetching a user by username (mocked authentication & Cognito response)"""

    response = client.get("/user/siteadmin")  # ✅ Changed from "test_user" to "siteadmin"

    # Debugging output
    print("\n🔍 DEBUG: Response status code:", response.status_code)
    print("🔍 DEBUG: Response JSON:", response.json())

    assert response.status_code == 200

def test_update_user():
  """Test updating a user's username and subscription status"""

  # Change username
  response = client.patch("/user/siteadmin", json={"username": "newadmin"})
  assert response.status_code == 200
  assert response.json()["username"] == "newadmin"

  # Change subscriber status
  response = client.patch("/user/newadmin", json={"subscriber": False})
  assert response.status_code == 200
  assert response.json()["subscriber"] is False