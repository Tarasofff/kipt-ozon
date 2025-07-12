from typing import Any, Dict
import bcrypt
from pydantic import ConfigDict, model_validator


def hash_password_str(password: str) -> str:
    salt = bcrypt.gensalt()
    pwd_bytes: bytes = password.encode()

    return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")


def validate_password_str(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed_password.encode("utf-8"))


class PasswordHashMixin:
    model_config = ConfigDict(strict=True)

    @model_validator(mode="before")
    @classmethod
    def hash_password(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        pwd = values.get("password")
        if pwd is None:
            return values

        values["password"] = hash_password_str(pwd)
        return values
