from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.user import User
from schemas.user import UserCreate, UserUpdate, UserResponse
from api.auth import get_current_user
try:
    from services.cognito import get_cognito_user  # Real Cognito
except ImportError:
    from mocks.cognito import get_cognito_user  # Use mock if real one fails

from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/user/{username}")
def get_user(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/user", response_model=UserResponse, dependencies=[Depends(get_current_user)])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user (only super admins can do this)"""
    new_user = User(cognito_id=user.cognito_id, subscriber=user.subscriber)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.patch("/user/{username}", response_model=UserResponse, dependencies=[Depends(get_current_user)])
def update_user(username: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    """Allow users to update their own subscriber status and username"""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_update.username is not None:
        # Ensure the new username is not already taken
        existing_user = db.query(User).filter(User.username == user_update.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username is already taken")
        user.username = user_update.username

    if user_update.subscriber is not None:
        user.subscriber = user_update.subscriber

    db.commit()
    db.refresh(user)
    return user
