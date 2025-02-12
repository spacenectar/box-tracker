import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from models.user import User
from schemas.user import UserCreate, UserUpdate, UserResponse, UserDeleteResponse
from api.auth import get_current_user
from mocks.cognito import get_cognito_user

router = APIRouter(prefix="/user", tags=["User"])

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    """Retrieve current user's info, merging details from Cognito and DB"""
    cognito_id = current_user.get("sub")
    if not cognito_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.cognito_id == cognito_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Current user not found")

    cognito_data = get_cognito_user(cognito_id) or {}

    return {
        "id": user.id,
        "cognito_id": user.cognito_id,
        "username": user.username,
        "name": cognito_data.get("name"),
        "email": cognito_data.get("email"),
        "photo": cognito_data.get("photo"),
        "subscriber": user.subscriber,
        "date_registered": user.date_registered,
        "date_last_logged_in": user.date_last_logged_in,
    }

@router.get("/{username}", response_model=UserResponse)
def get_user(username: str, db: Session = Depends(get_db)):
    """Retrieve a user by username, merging details from Cognito"""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    cognito_data = get_cognito_user(user.cognito_id) or {}

    return {
        "id": user.id,
        "cognito_id": user.cognito_id,
        "username": user.username,
        "name": cognito_data.get('name'),
        "email": cognito_data.get("email"),
        "photo": cognito_data.get("photo"),
        "subscriber": user.subscriber,
        "date_registered": user.date_registered,
        "date_last_logged_in": user.date_last_logged_in,
    }

@router.post("/", response_model=UserResponse, dependencies=[Depends(get_current_user)])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """Create a new user"""
    new_user = User(
        cognito_id=user.cognito_id,
        username=user.username,
        subscriber=user.subscriber
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.patch("/{username}", response_model=UserResponse, dependencies=[Depends(get_current_user)])
def update_user(username: str, user_update: UserUpdate, db: Session = Depends(get_db)):
    """Allow users to update their own subscriber status and username"""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_update.username is not None:
        existing_user = db.query(User).filter(User.username == user_update.username).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Username is already taken")
        user.username = user_update.username

    if user_update.subscriber is not None:
        user.subscriber = user_update.subscriber

    db.commit()
    db.refresh(user)
    return user

@router.delete("/{username}", response_model=UserDeleteResponse)
def delete_user(username: str, db: Session = Depends(get_db)):
    """Delete a user by username"""
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return UserDeleteResponse(message=f"User {username} deleted successfully")
