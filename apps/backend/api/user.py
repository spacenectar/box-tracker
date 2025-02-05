from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.user import User
from schemas.user import UserCreate, UserResponse
from api.auth import get_current_user

from typing import List

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/users", response_model=UserResponse, dependencies=[Depends(get_current_user)])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(username=user.username, email=user.email, hashed_password="hashed_pw")
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.get("/users", response_model=List[UserResponse], dependencies=[Depends(get_current_user)])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    return users