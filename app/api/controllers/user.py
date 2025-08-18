from fastapi import APIRouter, Depends, status
from app.config.config import app_config
from app.db.session import get_session
from app.schemas.user import UserLogin, UserCreate, UserAuthData
from app.services.jwt import JWTService
from app.services.user import UserService
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix=app_config.api_v1_prefix.user, tags=["Users"])


def get_user_service(session: AsyncSession = Depends(get_session)) -> UserService:
    jwt_service = JWTService()
    return UserService(jwt_service=jwt_service, session=session)


@router.post(
    "/register",
    response_model=UserLogin,
    status_code=status.HTTP_201_CREATED,
)
async def create(
    user: UserCreate,
    user_service: UserService = Depends(get_user_service),
) -> UserLogin:
    return await user_service.create(user)


@router.post("/login", response_model=UserLogin, status_code=status.HTTP_200_OK)
async def login(
    user: UserAuthData,
    user_service: UserService = Depends(get_user_service),
):
    return await user_service.login(user.phone, user.password)
