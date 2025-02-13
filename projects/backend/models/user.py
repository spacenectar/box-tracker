import uuid
from sqlalchemy import Column, String, Boolean, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    auth_id = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    subscriber = Column(Boolean, default=False)
    date_registered = Column(TIMESTAMP)
    date_last_logged_in = Column(TIMESTAMP)

    spaces = relationship("SpaceUser", back_populates="user")
