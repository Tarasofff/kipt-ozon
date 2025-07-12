from app.db.models import User
from app.repository import UserRepository
from app.schemas.user import UpdateUserSchema, UserSchema, LoginUserSchema
from app.services import JWTService
from sqlalchemy.ext.asyncio import AsyncSession


class UserService:

    def __init__(
        self,
        jwt_service: JWTService,
        session: AsyncSession,
    ):
        self.user_repo = UserRepository(session=session)
        self.jwt_service = jwt_service
        self.session = session

    def get_token(self, user: User):
        payload = self.jwt_service.get_payload(user)
        return self.jwt_service.encode(payload)

    async def create(self, user_data: UserSchema):
        user = User(**user_data.model_dump())

        created_user = await self.user_repo.create(user)

        token_data = self.get_token(created_user)

        await self.session.commit()

        return LoginUserSchema(
            token=token_data.token,
            token_type=token_data.token_type,
            first_name=created_user.first_name,
            middle_name=created_user.middle_name,
            last_name=created_user.last_name,
            date_of_birth=created_user.date_of_birth,
            id=created_user.id,
            is_active=created_user.is_active,
            phone=created_user.phone,
            email=created_user.email,
            role_id=created_user.role_id,
        )

    async def login(self, phone: str, password: str):
        pass

    async def get_by_phone(self, phone: str):
        return await self.user_repo.get_by_phone(phone)

    async def update(self, id: int, user_data: UpdateUserSchema):
        fields_to_update = user_data.model_dump(exclude_none=True)
        return await self.user_repo.update(id, fields_to_update)
