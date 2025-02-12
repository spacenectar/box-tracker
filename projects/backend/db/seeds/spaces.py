from sqlalchemy.orm import Session
from models.space import Space
from models.space_user import SpaceUser
from slugify import slugify
import uuid

def seed_spaces(db: Session):
    seed_space_data = [
        {
            "id": uuid.UUID("7ec5ddcd-8a9c-4ce8-81fd-76a691b3a93f"),
            "name": "London Move",
            "slug": "london-move",
            "created_by": "680f46fa-085d-4be1-a6ab-a66a6615dbea"
        },
        {
            "id": uuid.UUID("f6f459a4-f1b2-4638-9943-4ff2d6dea0b9"),
            "name": "Household Storage",
            "slug": "household-storage",
            "created_by": "680f46fa-085d-4be1-a6ab-a66a6615dbea"
        },
        {
            "id": uuid.UUID("f66eda71-ab5e-49e6-9160-d3fd3631ae5b"),
            "name": "Business Relocation",
            "slug": "business-relocation",
            "created_by": "680f46fa-085d-4be1-a6ab-a66a6615dbea"
        }
    ]

    for space_data in seed_space_data:
        existing_space = db.query(Space).filter(Space.id == space_data["id"]).first()
        if not existing_space:
            new_space = Space(**space_data)
            new_space.slug = slugify(new_space.name)
            db.add(new_space)
            db.commit()
            db.refresh(new_space)

            # Assign the creator as space_admin
            space_user = SpaceUser(space_id=new_space.id, user_id=space_data["created_by"], role="space_admin")
            db.add(space_user)

    db.commit()
    print("✅ Spaces seeded successfully!")
