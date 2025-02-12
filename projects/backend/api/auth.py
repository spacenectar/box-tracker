from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt import ExpiredSignatureError, InvalidTokenError
from datetime import datetime, timedelta
import os
from fastapi import APIRouter
import logging

auth_router = APIRouter()

logger = logging.getLogger(__name__)

# Secret key (use environment variables in production)
SECRET_KEY = os.getenv("JWT_SECRET", "dev_secret_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """Generate a JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str):
    """Decode and verify JWT token using PyJWT."""
    try:
        logging.debug(f"Verifying token: {token}")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        logging.debug(f"Token verified. Payload: {payload}")
        return payload
    except ExpiredSignatureError:
        logging.error("Token has expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except InvalidTokenError as e:
        logging.error(f"Invalid token: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

def get_current_user(token: str = Depends(oauth2_scheme)):
    """Dependency to extract the current user from the token."""
    logger.debug("🔍 AUTH CHECK TRIGGERED: Token received -> %s", token)
    return verify_token(token)


@auth_router.post("/token")
def generate_dummy_token():
  """Temporary endpoint to generate a test token."""
  if os.getenv("ENV") == "production":
    raise HTTPException(
      status_code=status.HTTP_403_FORBIDDEN,
      detail="This endpoint is not available in production",
    )
  return {"access_token": create_access_token({"sub": "admin-123"})}
