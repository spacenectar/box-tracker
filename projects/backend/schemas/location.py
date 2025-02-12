from pydantic import BaseModel
import uuid

class LocationBase(BaseModel):
    """Base schema for locations."""
    name: str
    address: str | None = None
    notes: str | None = None
    what3words: str | None = None

class LocationCreate(LocationBase):
    """Schema for creating a new location."""
    space_id: uuid.UUID  # New field to specify which space the location belongs to

    def generate_slug(self):
        """Generate a slug from the name."""
        from slugify import slugify
        return slugify(self.name)

class LocationUpdate(BaseModel):
    """Schema for updating a location (excluding slug and space_id)."""
    name: str | None = None
    address: str | None = None
    notes: str | None = None
    what3words: str | None = None

class LocationResponse(LocationBase):
    """Response schema for a location, including slug, space ID, and UUID."""
    id: uuid.UUID
    slug: str
    space_id: uuid.UUID

    class Config:
        from_attributes = True
