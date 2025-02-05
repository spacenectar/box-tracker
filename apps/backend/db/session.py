import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pathlib import Path

DATABASE_URL = os.getenv("DATABASE_URL")

# Create a new session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
