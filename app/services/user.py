from app.db.models import User
from app.repository import UserRepository
from app.schemas import CreateUserSchema, UpdateUserSchema, UserSchema
from app.services import JWTService


class UserService:
    def __init__(self, user_repo: UserRepository, jwt_service: JWTService):
        self.user_repo = user_repo
        self.jwt_service = jwt_service

    def get_token(self, user: User):
        payload = {
            "sub": str(user.id),
            "phone": user.phone,
            "role": user.role.name if user.role else None,
        }

        return self.jwt_service.encode(payload)

    async def create(self, user_data: UserSchema) -> CreateUserSchema:
        user = User(**user_data.model_dump())

        created_user = await self.user_repo.create(user)

        token_data = self.get_token(created_user)

        return CreateUserSchema(
            user=created_user, token=token_data.token, token_type=token_data.token_type
        )

    async def get_by_phone(self, phone: str):
        return await self.user_repo.get_by_phone(phone)

    async def update(self, id: int, user_data: UpdateUserSchema):
        fields_to_update = user_data.model_dump(exclude_none=True)
        return await self.user_repo.update(id, fields_to_update)
