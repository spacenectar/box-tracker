import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pathlib import Path

DATABASE_URL = os.getenv("DATABASE_URL")

if os.getenv("TESTING"):
    DATABASE_URL = "sqlite:///:memory:"

# Create a new session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
