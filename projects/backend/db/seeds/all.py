import os
import sys
from pathlib import Path

from ..session import SessionLocal
from ..seeds.users import seed_users

def run_seeds():
    db = SessionLocal()
    print("🌱 Running database seeding...")
    seed_users(db)
    db.close()
    print("✅ All seeds executed!")

if __name__ == "__main__":
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    if ENVIRONMENT == "development":
        run_seeds()
    else:
        print("🚫 Skipping seeding in production.")
