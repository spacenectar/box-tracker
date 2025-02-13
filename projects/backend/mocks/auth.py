def get_auth_user(auth_id: str):
    """Mock function to return fake user data based on Auth Provider ID"""

    fake_users = {
        "admin-123": {
            "auth_id": "admin-123",
            "username": "siteadmin",
            "name": "Site Admin",
            "email": "admin@example.com",
            "photo": "https://i.pravatar.cc/150?img=60",
            "subscriber": True,
            "date_registered": "2024-02-01T12:00:00Z",
            "date_last_logged_in": "2024-02-07T15:30:00Z"
        },
        "admin-456": {
            "auth_id": "admin-456",
            "username": "accountadmin",
            "name": "Account Admin",
            "email": "admin2@example.com",
            "photo": "https://i.pravatar.cc/150?img=47",
            "subscriber": False,
            "date_registered": "2024-01-15T09:45:00Z",
            "date_last_logged_in": "2024-02-06T10:15:00Z"
        },
        "guest-789": {
            "auth_id": "guest-789",
            "username": "accountguest",
            "name": "Guest User",
            "email": "guest@example.com",
            "photo": "https://i.pravatar.cc/150?img=50",
            "subscriber": False,
            "date_registered": "2024-02-05T08:30:00Z",
            "date_last_logged_in": "2024-02-07T11:00:00Z"
        },
        "test-123": {
            "auth_id": "test-123",
            "username": "testuser",
            "name": "Test User",
            "email": "testuser@example.com",
            "photo": "https://example.com/avatar.png",
            "subscriber": False,
            "date_registered": "2024-02-01T12:00:00Z",
            "date_last_logged_in": "2024-02-07T15:30:00Z"
        },
    }

    return fake_users.get(auth_id, {
        "auth_id": auth_id,
        "username": "unknown",
        "name": "Unknown User",
        "email": "unknown@example.com",
        "photo": "https://example.com/avatar-default.jpg",
        "subscriber": False,
        "date_registered": None,
        "date_last_logged_in": None
    })
