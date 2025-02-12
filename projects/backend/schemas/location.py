from pydantic import BaseModel, UUID4
from typing import Optional

class LocationCreate(BaseModel):
    name: str
    address: str
    notes: Optional[str] = None
    what3words: Optional[str] = None

class LocationUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    what3words: Optional[str] = None

class LocationResponse(BaseModel):
    id: UUID4
    name: str
    address: str
    slug: str
    notes: Optional[str] = None
    what3words: Optional[str] = None
    # etc.

    class Config:
        orm_mode = True
