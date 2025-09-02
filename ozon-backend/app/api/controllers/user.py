from fastapi import APIRouter, Depends, status
from app.api.dependencies import check_login_user, check_register_user
from app.config.config import app_config
from app.db.models import User
from app.db.session import get_session
from app.schemas.user import UserLoginSchema, UserCreateSchema
from app.services.jwt import JWTService
from app.services.user import UserService
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix=app_config.api_v1_prefix.user, tags=["Users"])


def get_user_service(session: AsyncSession = Depends(get_session)) -> UserService:
    jwt_service = JWTService()
    return UserService(jwt_service=jwt_service, session=session)


@router.post(
    "/register",
    response_model=UserLoginSchema,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    user: UserCreateSchema = Depends(check_register_user),
    user_service: UserService = Depends(get_user_service),
):
    return await user_service.create(user)


@router.post("/login", response_model=UserLoginSchema, status_code=status.HTTP_200_OK)
async def login(
    user: User = Depends(check_login_user),
    user_service: UserService = Depends(get_user_service),
):
    return await user_service.login(user)
