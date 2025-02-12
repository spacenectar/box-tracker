from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.user import User
import uuid

def seed_users(db: Session):
    users_data = [
        {
            "id": uuid.UUID("680f46fa-085d-4be1-a6ab-a66a6615dbea"),
            "cognito_id": "admin-123",
            "username": "siteadmin",
            "staff_role": "super_admin",
            "subscriber": True
        },
        {
            "id": uuid.UUID("d4faeb1f-77ce-4514-96cd-001198814f2e"),
            "cognito_id": "admin-456",
            "username": "accountadmin",
            "staff_role": "admin",
            "subscriber": False
        },
        {
            "id": uuid.UUID("7f395b59-38fe-4eb7-908c-5fb123e0a7aa"),
            "cognito_id": "guest-789",
            "username": "accountguest",
            "staff_role": "staff",
            "subscriber": False
        },
    ]

    for user_data in users_data:
        existing_user = db.query(User).filter(User.id == user_data["id"]).first()
        if not existing_user:
            new_user = User(**user_data)
            db.add(new_user)

    db.commit()
    print("✅ Users seeded successfully!")

if __name__ == "__main__":
    db = SessionLocal()
    seed_users(db)
    db.close()
