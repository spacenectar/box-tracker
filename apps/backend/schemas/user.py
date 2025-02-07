from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import Optional
from models.user import StaffRole

class UserBase(BaseModel):
    id: UUID
    cognito_id: str  # Immutable
    username: str  # Immutable
    staff_role: Optional[StaffRole] = None  # Super admins only
    subscriber: bool = False  # Users can manage this
    date_registered: Optional[datetime] = None
    date_last_logged_in: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    cognito_id: str  # Required when creating a user
    username: str  # Required when creating a user
    staff_role: Optional[StaffRole] = None  # Only super admins can set this
    subscriber: bool = False  # Users can manage this

class UserUpdate(BaseModel):
    username: Optional[str] = None # Users can change their username
    subscriber: Optional[bool] = None  # Users can toggle subscription

class UserResponse(UserBase):
    class Config:
        from_attributes = True
