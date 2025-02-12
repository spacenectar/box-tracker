from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.user import User
from models.space import Space, SpaceUser
from helpers.permissions_matrix import PERMISSIONS_MATRIX

def verify_space_access(space_slug: str, cognito_id: str, method: str, db: Session):
    """
    1. Look up the actual user by their cognito_id string (e.g., "admin-123").
    2. Use that user's UUID to check space_users for role/permissions.
    """
    if not cognito_id:
        raise HTTPException(status_code=401, detail="Authentication required")

    # First find the actual User record by cognito_id
    user = db.query(User).filter(User.cognito_id == cognito_id).first()
    if not user:
        raise HTTPException(status_code=403, detail="User not found in DB for cognito_id")

    # Next find the requested space by slug
    space = db.query(Space).filter(Space.slug == space_slug).first()
    if not space:
        raise HTTPException(status_code=404, detail=f"Space '{space_slug}' not found")

    # Then check the space_user link, using the user's UUID
    space_user = db.query(SpaceUser).filter(
        SpaceUser.space_id == space.id,
        SpaceUser.user_id == user.id  # user.id is a UUID
    ).first()

    if not space_user:
        raise HTTPException(status_code=403, detail="User not associated with this space")

    # Finally, validate that the user's role can do the requested HTTP method
    allowed_methods = PERMISSIONS_MATRIX.get(space_user.role, set())
    if method not in allowed_methods:
        raise HTTPException(status_code=403, detail="Insufficient permissions")

    return space
