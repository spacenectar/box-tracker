from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import and_
from models.location import Location
from models.space import Space
from db.session import get_db
from schemas.location import LocationCreate, LocationUpdate, LocationResponse
import uuid

router = APIRouter(prefix="/location", tags=["Location"])

@router.post("/", response_model=LocationResponse)
def create_location(location_data: LocationCreate, db: Session = Depends(get_db)):
    """Create a new location within a space."""
    location = Location(**location_data.dict())
    location.slug = location.generate_slug()

    db.add(location)
    db.commit()
    db.refresh(location)
    return location


@router.get("/{location_id}", response_model=LocationResponse)
def get_location_by_id(location_id: uuid.UUID, db: Session = Depends(get_db)):
    """Fetch a location by its UUID."""
    location = db.query(Location).filter(Location.id == location_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location


@router.get("/{space_slug}/{location_slug}", response_model=LocationResponse)
def get_location_by_slug(space_slug: str, location_slug: str, db: Session = Depends(get_db)):
    """Fetch a location by its namespaced slug (space_slug/location_slug)."""

    # First, fetch the space ID from the given space_slug
    space = db.query(Space).filter(Space.slug == space_slug).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    # Now fetch the location using space_id and location_slug
    location = db.query(Location).filter(and_(Location.slug == location_slug, Location.space_id == space.id)).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    return location


@router.patch("/{space_slug}/{location_slug}", response_model=LocationResponse)
def update_location(space_slug: str, location_slug: str, location_update: LocationUpdate, db: Session = Depends(get_db)):
    """Update an existing location within a space (by slug)."""

    space = db.query(Space).filter(Space.slug == space_slug).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    location = db.query(Location).filter(and_(Location.slug == location_slug, Location.space_id == space.id)).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    for key, value in location_update.dict(exclude_unset=True).items():
        setattr(location, key, value)

    db.commit()
    db.refresh(location)
    return location


@router.delete("/{space_slug}/{location_slug}")
def delete_location(space_slug: str, location_slug: str, db: Session = Depends(get_db)):
    """Delete a location within a space (by slug)."""

    space = db.query(Space).filter(Space.slug == space_slug).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    location = db.query(Location).filter(and_(Location.slug == location_slug, Location.space_id == space.id)).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    db.delete(location)
    db.commit()
    return {"message": "Location deleted successfully"}