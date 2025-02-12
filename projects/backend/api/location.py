from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import Dict, Any
import uuid

from models.location import Location
from models.space import Space
from db.session import get_db
from schemas.location import LocationCreate, LocationUpdate, LocationResponse
from services.permissions import verify_space_access
from api.auth import get_current_user

router = APIRouter(prefix="/location", tags=["Location"])

@router.post("/{space_slug}", response_model=LocationResponse)
def create_location(
    space_slug: str,
    location_data: LocationCreate,
    user: Dict[str, Any] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    space = verify_space_access(space_slug, user["sub"], "POST", db)
    location = Location(**location_data.dict(), space_id=space.id)
    location.slug = location.generate_slug()

    db.add(location)
    db.commit()
    db.refresh(location)
    return location

@router.get("/id/{location_id}", response_model=LocationResponse)
def get_location_by_id(
    location_id: uuid.UUID,
    user: Dict[str, Any] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    location = db.query(Location).filter(Location.id == location_id).first()
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    # We must also verify that the user can access the parent space
    if not location.space:
        raise HTTPException(status_code=500, detail="Location missing a valid space")

    verify_space_access(location.space.slug, user["sub"], "GET", db)
    return location

@router.get("/{space_slug}/{location_slug}", response_model=LocationResponse)
def get_location_by_slug(
    space_slug: str,
    location_slug: str,
    user: Dict[str, Any] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    space = verify_space_access(space_slug, user["sub"], "GET", db)
    location = db.query(Location).filter(
        Location.slug == location_slug,
        Location.space_id == space.id
    ).first()

    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    return location

@router.patch("/{space_slug}/{location_slug}", response_model=LocationResponse)
def update_location(
    space_slug: str,
    location_slug: str,
    location_update: LocationUpdate,
    user: Dict[str, Any] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    space = verify_space_access(space_slug, user["sub"], "PATCH", db)
    location = db.query(Location).filter(
        and_(Location.slug == location_slug, Location.space_id == space.id)
    ).first()

    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    for key, value in location_update.dict(exclude_unset=True).items():
        setattr(location, key, value)

    db.commit()
    db.refresh(location)
    return location

@router.delete("/{space_slug}/{location_slug}")
def delete_location(
    space_slug: str,
    location_slug: str,
    user: Dict[str, Any] = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    space = verify_space_access(space_slug, user["sub"], "DELETE", db)
    location = db.query(Location).filter(
        and_(Location.slug == location_slug, Location.space_id == space.id)
    ).first()

    if not location:
        raise HTTPException(status_code=404, detail="Location not found")

    db.delete(location)
    db.commit()
    return {"message": "Location deleted successfully"}
