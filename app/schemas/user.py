from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import date


class UserSchema(BaseModel):
    model_config = ConfigDict(strict=True)

    first_name: str
    middle_name: str
    last_name: str
    phone: str
    email: EmailStr | None = None
    date_of_birth: date
    is_active: bool
    role_id: int
    password: str
