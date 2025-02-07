import uuid
from enum import Enum
from sqlalchemy import Column, String, Boolean, TIMESTAMP
from sqlalchemy.dialects.postgresql import UUID
from db.base import Base

class StaffRole(str, Enum):
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    STAFF = "staff"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cognito_id = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    staff_role = Column(String, nullable=True)
    subscriber = Column(Boolean, default=False)
    date_registered = Column(TIMESTAMP)
    date_last_logged_in = Column(TIMESTAMP)
