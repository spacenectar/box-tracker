# /backend/mocks/cognito.py
def get_cognito_user(cognito_id: str):
    """Mock function to return fake user data"""
    return {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "photo": "https://i.pravatar.cc/200"
    }
