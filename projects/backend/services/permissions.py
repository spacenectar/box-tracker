from fastapi import Request, HTTPException, Depends
from fastapi.routing import APIRoute
from starlette.middleware.base import BaseHTTPMiddleware
from sqlalchemy.orm import Session
from db.session import get_db
from api.auth import get_current_user
from helpers.permissions_matrix import PERMISSIONS_MATRIX
from models.space_user import SpaceUser
from models.space import Space
import logging

# Define global bypass routes
GLOBAL_BYPASS_ROUTES = {
    "GET": [
        "/user/me",  # Users can always fetch their own profile
        # "/log",  # read-only logs (not implemented yet)
        "/healthcheck",  # Healthcheck endpoint is always accessible
    ],
    "PATCH": [
        "/user/me",  # Users can update their own profile
    ],
}

class PermissionsMiddleware(BaseHTTPMiddleware):
    """Middleware to enforce user permissions based on space roles."""

    async def dispatch(self, request: Request, call_next):
        db: Session = next(get_db())

        # Extract method and path
        method = request.method
        path = request.url.path

        # Bypass global routes
        if method in GLOBAL_BYPASS_ROUTES and any(path.startswith(route) for route in GLOBAL_BYPASS_ROUTES[method]):
            return await call_next(request)

        # Extract user from request
        current_user = await get_current_user(request)

        # Extract space slug (if applicable)
        space_slug = self.extract_space_slug(path)

        # If no space slug, deny access (unless explicitly bypassed)
        if not space_slug:
            raise HTTPException(status_code=403, detail="Forbidden: No space context found.")

        # Fetch user role in space
        user_role = self.get_user_role(db, current_user["id"], space_slug)

        # Enforce space-based permissions
        if not self.is_authorized(user_role, method, path):
            raise HTTPException(status_code=403, detail="Forbidden: Insufficient permissions.")

        return await call_next(request)

    def extract_space_slug(self, path: str) -> str | None:
        """Extract space slug from URL if present (e.g., /location/{space_slug}/{location_slug})."""
        segments = path.strip("/").split("/")
        return segments[1] if len(segments) > 1 else None

    def get_user_role(self, db: Session, user_id: str, space_slug: str) -> str | None:
        """Retrieve the user's role for a given space."""
        space = db.query(Space).filter(Space.slug == space_slug).first()
        if not space:
            return None

        space_user = db.query(SpaceUser).filter(SpaceUser.space_id == space.id, SpaceUser.user_id == user_id).first()
        return space_user.role if space_user else None

    def is_authorized(self, role: str | None, method: str, path: str) -> bool:
        """Determine if the user's role allows them to perform the requested action."""

        allowed_methods = PERMISSIONS_MATRIX.get(role, set())
        return method in allowed_methods
