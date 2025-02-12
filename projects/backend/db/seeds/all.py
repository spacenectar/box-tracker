import os
import sys
from pathlib import Path

from db.session import SessionLocal
from db.seeds.users import seed_users
from db.seeds.spaces import seed_spaces
from db.seeds.locations import seed_locations



def run_seeds():
    db = SessionLocal()
    print("🌱 Running database seeding...")

    seed_users(db)
    seed_spaces(db)
    seed_locations(db)

    db.close()
    print("✅ All seeds executed!")

if __name__ == "__main__":
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    if ENVIRONMENT == "development":
        run_seeds()
    else:
        print("🚫 Skipping seeding in production.")
