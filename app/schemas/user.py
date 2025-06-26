from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import date

from app.db.models import User
from app.schemas import TokenSchema
from app.utils.utils import PasswordHashMixin  # ,BaseModelExcludeNone


class UserSchema(PasswordHashMixin, BaseModel):
    model_config = ConfigDict(strict=True)

    first_name: str
    middle_name: str
    last_name: str
    phone: str
    email: EmailStr | None = None
    date_of_birth: date
    password: str


class UpdateUserSchema(PasswordHashMixin, BaseModel):  # BaseModelExcludeNone
    model_config = ConfigDict(strict=True)

    first_name: Optional[str] = None
    middle_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    date_of_birth: Optional[date] = None
    password: Optional[str] = None
    role_id: Optional[int] = None
    is_active: Optional[bool] = None


class LoginUserSchema(TokenSchema, BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    user: User
