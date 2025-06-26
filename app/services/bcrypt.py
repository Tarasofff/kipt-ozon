import bcrypt


class BcryptService:

    def __init__(self):
        pass

    def hash_password(self, password: str) -> str:
        salt = bcrypt.gensalt()
        pwd_bytes: bytes = password.encode()

        return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")

    def validate_password(self, password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode(), hashed_password.encode("utf-8"))
