from sqlalchemy.orm import Session
from db.session import SessionLocal
from models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_users(db: Session):
    users_data = [
        {"username": "siteadmin", "email": "siteadmin@example.com", "password": "imtheboss"},
        {"username": "accountadmin", "email": "accountadmin@example.com", "password": "hasthekeys"},
        {"username": "accountguest", "email": "accountguest@example.com", "password": "wipeyourfeet"},
    ]

    for user_data in users_data:
        existing_user = db.query(User).filter(User.username == user_data["username"]).first()
        if not existing_user:
            hashed_password = pwd_context.hash(user_data["password"])
            new_user = User(
                username=user_data["username"],
                email=user_data["email"],
                hashed_password=hashed_password
            )
            db.add(new_user)

    db.commit()
    print("✅ Users seeded successfully!")

if __name__ == "__main__":
    db = SessionLocal()
    seed_users(db)
    db.close()