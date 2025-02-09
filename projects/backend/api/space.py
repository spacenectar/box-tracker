from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from models.space import Space
from schemas.space import SpaceCreate, SpaceResponse
from slugify import slugify
import uuid

router = APIRouter(prefix="/space", tags=["Spaces"])

@router.post("/", response_model=SpaceResponse)
def create_space(space_data: SpaceCreate, db: Session = Depends(get_db)):
    """Create a new space"""
    slug = slugify(space_data.name)
    existing_space = db.query(Space).filter(Space.slug == slug).first()

    if existing_space:
        raise HTTPException(status_code=400, detail="Space with this name already exists")

    new_space = Space(
        id=uuid.uuid4(),
        name=space_data.name,
        slug=slug,
        created_by=space_data.created_by
    )
    db.add(new_space)
    db.commit()
    db.refresh(new_space)
    return new_space

@router.get("/id/{space_id}", response_model=SpaceResponse)
def get_space(space_id: uuid.UUID, db: Session = Depends(get_db)):
    """Get a space by ID"""
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    return space

@router.get("/{slug}", response_model=SpaceResponse)
def get_space_by_slug(slug: str, db: Session = Depends(get_db)):
    """Get a space by slug"""
    space = db.query(Space).filter(Space.slug == slug).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")
    return space

@router.delete("/{space_id}")
def delete_space(space_id: uuid.UUID, db: Session = Depends(get_db)):
    """Delete a space"""
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    db.delete(space)
    db.commit()
    return {"message": "Space deleted successfully"}
