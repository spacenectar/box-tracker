from sqlalchemy import Column, ForeignKey, UUID, String
from sqlalchemy.orm import relationship
import uuid
from enum import Enum
from db.base import Base

class SpaceRole(str, Enum):
    SPACE_ADMIN = "space_admin"
    ADMIN = "admin"
    EDITOR = "editor"
    VIEWER = "viewer"

class SpaceUser(Base):
    __tablename__ = "space_users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    space_id = Column(UUID(as_uuid=True), ForeignKey("spaces.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String, nullable=False)

    space = relationship("Space", back_populates="users")
    user = relationship("User", back_populates="spaces")
