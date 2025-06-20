from datetime import datetime, timedelta, timezone
import jwt
from app.config.config import app_config


def encode_jwt(
    payload: dict,
    private_key: str = app_config.auth_jwt.private_key_path.read_text(),
    algorithm: str = app_config.auth_jwt.algorithm,
    expire_minutes: int = app_config.auth_jwt.access_token_expire_minutes,
    expire_timedelta: timedelta | None = None,
) -> str:
    to_encode = payload.copy()
    now = datetime.now(timezone.utc)
    if expire_timedelta:
        expire = now + expire_timedelta
    else:
        expire = now + timedelta(minutes=expire_minutes)
    to_encode.update(
        exp=expire,
        iat=now,
    )
    return jwt.encode(
        to_encode,
        private_key,
        algorithm=algorithm,
    )


def decode_jwt(
    token: str | bytes,
    public_key: str = app_config.auth_jwt.public_key_path.read_text(),
    algorithm: str = app_config.auth_jwt.algorithm,
) -> dict:
    return jwt.decode(
        token,
        public_key,
        algorithms=[algorithm],
    )
