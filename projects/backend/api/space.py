from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.session import get_db
from models.user import User
from models.space import Space
from models.space_user import SpaceUser
from schemas.space import SpaceCreate, SpaceResponse, SpaceUpdate
from slugify import slugify
from api.auth import get_current_user
import uuid

router = APIRouter(prefix="/space", tags=["Spaces"])

@router.post("/", response_model=SpaceResponse)
def create_space(
    space_data: SpaceCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Create a new space and assign creator as space_admin"""
    slug = slugify(space_data.name)

    existing_space = db.query(Space).filter(Space.slug == slug).first()
    if existing_space:
        raise HTTPException(status_code=400, detail="Space with this name already exists")

    # Fetch the actual user ID from the DB using the Cognito ID
    user = db.query(User).filter(User.cognito_id == current_user["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    new_space = Space(
        id=uuid.uuid4(),
        name=space_data.name,
        slug=slug,
        created_by=user.id  # Use the actual UUID from the users table
    )
    db.add(new_space)
    db.commit()
    db.refresh(new_space)

    # Assign the creator as space_admin
    space_user = SpaceUser(space_id=new_space.id, user_id=user.id, role="space_admin")
    db.add(space_user)
    db.commit()

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

@router.patch("/id/{space_id}", response_model=SpaceResponse)
def update_space(
    space_id: uuid.UUID,
    space_data: SpaceUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Update space details - only space_admin can do this"""
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    # Fetch the actual user ID from the DB using the Cognito ID
    user = db.query(User).filter(User.cognito_id == current_user["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if the user has space_admin role
    user_space_entry = db.query(SpaceUser).filter(
        SpaceUser.space_id == space_id,
        SpaceUser.user_id == user.id
    ).first()

    if not user_space_entry or user_space_entry.role != "space_admin":
        raise HTTPException(status_code=403, detail="Permission denied")

    # Proceed with the update
    if space_data.name:
        space.name = space_data.name
        space.slug = slugify(space_data.name)

    db.commit()
    db.refresh(space)
    return space

@router.delete("/id/{space_id}")
def delete_space(
    space_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Delete a space - only space_admin can do this"""
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    # Fetch the actual user ID from the DB using the Cognito ID
    user = db.query(User).filter(User.cognito_id == current_user["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if user has space_admin role
    user_space_entry = db.query(SpaceUser).filter(
        SpaceUser.space_id == space_id,
        SpaceUser.user_id == user.id
    ).first()

    if not user_space_entry or user_space_entry.role != "space_admin":
        raise HTTPException(status_code=403, detail="Permission denied")

    # ✅ Explicitly delete space_users entries before deleting the space
    db.query(SpaceUser).filter(SpaceUser.space_id == space_id).delete()
    db.commit()

    db.delete(space)
    db.commit()

    return {"message": "Space deleted successfully"}
