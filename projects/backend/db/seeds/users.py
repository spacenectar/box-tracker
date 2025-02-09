from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.user import User

def seed_users(db: Session):
    users_data = [
      {"cognito_id": "admin-123", "username": "siteadmin", "staff_role": "super_admin", "subscriber": True},
      {"cognito_id": "admin-456", "username": "accountadmin", "staff_role": "admin", "subscriber": False},
      {"cognito_id": "guest-789", "username": "accountguest", "staff_role": "staff", "subscriber": False},
    ]

    for user_data in users_data:
        existing_user = db.query(User).filter(User.cognito_id == user_data["cognito_id"]).first()
        if not existing_user:
            new_user = User(**user_data)
            db.add(new_user)

    db.commit()
    print("✅ Users seeded successfully!")

if __name__ == "__main__":
    db = SessionLocal()
    seed_users(db)
    db.close()
