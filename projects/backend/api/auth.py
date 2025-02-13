import requests
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import os
import logging
from datetime import datetime, timedelta
from fastapi import APIRouter

auth_router = APIRouter()

logger = logging.getLogger(__name__)

# Environment Variables
ENV = os.getenv("ENVIRONMENT", "development")
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
JWT_SECRET = os.getenv("JWT_SECRET", "dev_secret_key")  # Only used in dev mode

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Clerk Token Verification
CLERK_VERIFY_URL = "https://api.clerk.dev/v1/tokens/verify"

def verify_token(token: str):
    """
    Verify JWT using Clerk in production and a locally signed secret in development.
    """
    try:
        if ENV == "production":
            # Verify the token with Clerk
            headers = {"Authorization": f"Bearer {CLERK_SECRET_KEY}"}
            response = requests.post(CLERK_VERIFY_URL, json={"token": token}, headers=headers)

            if response.status_code != 200:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

            payload = response.json()

            return {
                "sub": payload["sub"],
                "email": payload.get("email_address"),
                "username": payload.get("username"),
                "photo": payload.get("image_url"),
            }
        else:
            # Local development verification
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])

        return {
            "sub": payload["sub"],
            "email": payload.get("email"),
            "username": payload.get("username"),
            "photo": payload.get("photo"),
        }
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


def get_current_user(token: str = Depends(oauth2_scheme)):
    """Extract user from JWT."""
    return verify_token(token)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Generate a JWT access token for local development."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=30))
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, JWT_SECRET, algorithm="HS256")


@auth_router.post("/token")
def generate_dummy_token():
    """Temporary endpoint to generate a test token (only available in dev mode)."""
    if ENV == "production":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This endpoint is not available in production",
        )
    return {"access_token": create_access_token({"sub": "admin-123"})}
