import boto3
import os
from botocore.exceptions import BotoCoreError, ClientError

COGNITO_USER_POOL_ID = os.getenv("COGNITO_USER_POOL_ID")
COGNITO_REGION = os.getenv("COGNITO_REGION")

def get_cognito_user(cognito_id: str):
    """Fetch user details from AWS Cognito."""
    client = boto3.client("cognito-idp", region_name=COGNITO_REGION)

    try:
        response = client.admin_get_user(
            UserPoolId=COGNITO_USER_POOL_ID,
            Username=cognito_id
        )

        attributes = {attr["Name"]: attr["Value"] for attr in response["UserAttributes"]}

        return {
            "name": attributes.get("name"),
            "email": attributes.get("email"),
            "photo": attributes.get("picture")
        }
    except (BotoCoreError, ClientError) as e:
        print(f"Error fetching Cognito user: {e}")
        return None
