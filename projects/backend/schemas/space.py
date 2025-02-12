from pydantic import BaseModel
import uuid

class SpaceBase(BaseModel):
    """Base schema for a space."""
    name: str

class SpaceCreate(SpaceBase):
    """Schema for creating a new space."""
    created_by: uuid.UUID  # The user creating the space

class SpaceUpdate(BaseModel):
    """Schema for updating a space."""
    name: str | None = None

class SpaceResponse(SpaceBase):
    """Response schema for a space."""
    id: uuid.UUID
    slug: str
    created_by: uuid.UUID

    class Config:
        from_attributes = True
