from pydantic import BaseModel, Field, field_validator
from uuid import UUID
from datetime import datetime
from typing import Optional
from services.profanity import check_profanity

class UserBase(BaseModel):
    id: UUID
    cognito_id: str
    username: str = Field(..., min_length=3)
    subscriber: bool = False
    date_registered: Optional[datetime] = None
    date_last_logged_in: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    cognito_id: str
    username: str = Field(..., min_length=3)
    subscriber: bool = False

    @field_validator("username")
    @classmethod
    def validate_username(cls, value):
        return check_profanity(value)

class UserUpdate(BaseModel):
    username: Optional[str] = Field(None, min_length=3)
    subscriber: Optional[bool] = None

    @field_validator("username")
    @classmethod
    def validate_username(cls, value):
        return check_profanity(value)

class UserResponse(UserBase):
    """Includes additional Cognito fields in API responses"""
    name: Optional[str] = None
    email: Optional[str] = None
    photo: Optional[str] = None

    class Config:
        from_attributes = True

class UserDeleteResponse(BaseModel):
    message: str
