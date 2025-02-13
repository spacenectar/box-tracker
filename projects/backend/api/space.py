from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import uuid
from slugify import slugify

from db.session import get_db
from models.user import User
from models.space import Space
from models.space_user import SpaceUser
from schemas.space import SpaceCreate, SpaceResponse, SpaceUpdate
from api.auth import get_current_user
from services.permissions import verify_space_access

router = APIRouter(prefix="/space", tags=["Spaces"])

@router.post("/", response_model=SpaceResponse)
def create_space(
    space_data: SpaceCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new space and assign the creator as space_admin.
    There's no existing slug to check yet, so we don't call verify_space_access here.
    """
    if not current_user or "sub" not in current_user:
        raise HTTPException(status_code=401, detail="Missing or invalid authentication token")

    user = db.query(User).filter(User.auth_id == current_user["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found in DB")

    slug = slugify(space_data.name)
    existing_space = db.query(Space).filter(Space.slug == slug).first()
    if existing_space:
        raise HTTPException(status_code=400, detail="Space with this name already exists")

    new_space = Space(
        id=uuid.uuid4(),
        name=space_data.name,
        slug=slug,
        created_by=user.id
    )
    db.add(new_space)
    db.commit()
    db.refresh(new_space)

    # Assign the creator as `space_admin`
    space_user = SpaceUser(space_id=new_space.id, user_id=user.id, role="space_admin")
    db.add(space_user)
    db.commit()

    return new_space


@router.get("/id/{space_id}", response_model=SpaceResponse)
def get_space_by_id(
    space_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve a space by its UUID, then verify access to it.
    """
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    # Verifies the user can "GET" this space
    verify_space_access(space.slug, current_user["sub"], "GET", db)
    return space


@router.get("/{slug}", response_model=SpaceResponse)
def get_space_by_slug(
    slug: str,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve a space by its slug, verifying access.
    """
    # If the space doesn't exist or they don't have a space_user row, 404 or 403
    space = verify_space_access(slug, current_user["sub"], "GET", db)
    return space


@router.patch("/id/{space_id}", response_model=SpaceResponse)
def update_space(
    space_id: uuid.UUID,
    space_data: SpaceUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Update space details - must have permission to PATCH.
    """
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    verify_space_access(space.slug, current_user["sub"], "PATCH", db)

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
    """
    Delete a space - must have permission to DELETE.
    """
    space = db.query(Space).filter(Space.id == space_id).first()
    if not space:
        raise HTTPException(status_code=404, detail="Space not found")

    verify_space_access(space.slug, current_user["sub"], "DELETE", db)

    # Remove any space-user links first
    db.query(SpaceUser).filter(SpaceUser.space_id == space_id).delete()
    db.commit()

    db.delete(space)
    db.commit()
    return {"message": "Space deleted successfully"}
