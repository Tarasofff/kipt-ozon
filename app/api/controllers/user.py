from fastapi import APIRouter
from app.config.config import app_config
from app.schemas.user import UserSchema

router: APIRouter = APIRouter(prefix=app_config.api_v1_prefix.user)


@router.post("/")
async def create(user: UserSchema):
    pass
