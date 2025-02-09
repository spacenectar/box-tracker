from sqlalchemy import Column, String, Text, TIMESTAMP, func, ForeignKey, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from db.base import Base
from slugify import slugify

class Location(Base):
    __tablename__ = "locations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    space_id = Column(UUID(as_uuid=True), ForeignKey("spaces.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    slug = Column(String, nullable=False)
    address = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    what3words = Column(String, nullable=True)  # Optional geolocation
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())

    space = relationship("Space", back_populates="locations")

    def generate_slug(self):
        """Generate a unique slug within the space."""
        return slugify(self.name)

    __table_args__ = (
        # Ensure name and slug are unique *within* a space
        UniqueConstraint("space_id", "name", name="uq_location_name_per_space"),
        UniqueConstraint("space_id", "slug", name="uq_location_slug_per_space"),
    )
