import bcrypt

from app.schemas.user import UserSchema


def hash_password_str(
    password: str,
) -> str:
    salt = bcrypt.gensalt()
    pwd_bytes: bytes = password.encode()
    return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")


def validate_password_str(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))


async def create(user: UserSchema):
    pass
