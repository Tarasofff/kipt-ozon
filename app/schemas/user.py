from typing import Optional
from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import date
from app.schemas.token import TokenSchema
from app.utils.bcrypt import PasswordHashMixin
from app.utils.utils import DateParser


class UserBase(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    phone: str
    email: Optional[EmailStr]
    date_of_birth: date
    password: str
    is_active: bool
    role_id: Optional[int]


class UserCreate(PasswordHashMixin, DateParser, UserBase):
    model_config = ConfigDict(strict=True)


class UserRead(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class UserAuthData(BaseModel):
    phone: str
    password: str


class UserLogin(TokenSchema, UserBase):
    id: int

    model_config = ConfigDict(arbitrary_types_allowed=True)


class UpdateUserSchema(PasswordHashMixin, DateParser, BaseModel):
    first_name: Optional[str]
    middle_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    email: Optional[EmailStr]
    date_of_birth: Optional[date]
    password: Optional[str]
    role_id: Optional[int]
    is_active: Optional[bool]

    model_config = ConfigDict(strict=True)
