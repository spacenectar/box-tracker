from sqlalchemy import Column, ForeignKey, UUID, String
from sqlalchemy.orm import relationship
import uuid
from db.base import Base

class SpaceUser(Base):
    __tablename__ = "space_users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    space_id = Column(UUID(as_uuid=True), ForeignKey("spaces.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    role = Column(String, nullable=False)  # Space-specific role: 'space_admin', 'admin', 'editor', 'viewer'

    space = relationship("Space", back_populates="users")
    user = relationship("User", back_populates="spaces")
