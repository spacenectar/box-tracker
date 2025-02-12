from sqlalchemy import Column, String, TIMESTAMP, func, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from db.base import Base
from models.space_user import SpaceUser

class Space(Base):
    __tablename__ = "spaces"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True)
    slug = Column(String, nullable=False, unique=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    users = relationship("SpaceUser", back_populates="space", cascade="all, delete-orphan", lazy="joined")
    locations = relationship("Location", back_populates="space", cascade="all, delete-orphan")

    __table_args__ = (UniqueConstraint("slug", name="uq_space_slug"),)
