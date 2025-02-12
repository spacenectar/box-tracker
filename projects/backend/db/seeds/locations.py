from sqlalchemy.orm import Session
from models.location import Location
import uuid
from slugify import slugify

def seed_locations(db: Session):
    locations_data = [
        {"id": uuid.UUID("f64f7ca9-8755-4e7a-b493-cdf5c1557f37"), "space_id": uuid.UUID("f66eda71-ab5e-49e6-9160-d3fd3631ae5b"), "name": "Warehouse A"},
        {"id": uuid.UUID("f0343a78-9a76-4088-ac4d-6ef3be6ba11d"), "space_id": uuid.UUID("f66eda71-ab5e-49e6-9160-d3fd3631ae5b"), "name": "Storage Unit B"},
        {"id": uuid.UUID("dd0589ae-1ca9-41d4-a01c-2c1ec9357d9c"), "space_id": uuid.UUID("f66eda71-ab5e-49e6-9160-d3fd3631ae5b"), "name": "Office C"},
    ]

    for location_data in locations_data:
        existing_location = db.query(Location).filter(Location.id == location_data["id"]).first()
        if not existing_location:
            new_location = Location(**location_data)
            new_location.slug = slugify(new_location.name)  # Generate slug
            db.add(new_location)

    db.commit()
    print("✅ Locations seeded successfully!")
