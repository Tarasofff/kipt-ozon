from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel, EmailStr, Field
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent.parent


class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "certs" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "certs" / "jwt-public.pem"
    algorithm: str = "RS256"
    access_token_expire_minutes: int = 1  # 1440 24h


class ApiV1Prefix(BaseModel):
    global_prefix: str = "/v1"
    auth: str = "/auth"
    nurse: str = "/nurse"
    doctor: str = "/doctor"
    patient: str = "/patient"
    user: str = "/user"


class UserRole:
    ADMIN = "admin"
    DOCTOR = "doctor"
    NURSE = "nurse"


class UserAdminConfig(BaseSettings):
    first_name: str = ""
    middle_name: str = ""
    last_name: str = ""
    phone: str = ""
    email: EmailStr = "example@email.com"
    password: str = ""
    date_of_birth: str = ""

    model_config = SettingsConfigDict(env_prefix="USER_ADMIN_")


class DatabaseConfig(BaseSettings):
    user: str = ""
    password: str = ""
    port: int = 5432
    host: str = ""
    db: str = ""

    postgres_naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s",
        "pk": "pk_%(table_name)s",
    }

    def db_url(self) -> str:
        return f"postgresql+asyncpg://{self.user}:{self.password}@{self.host}:{self.port}/{self.db}"

    model_config = SettingsConfigDict(env_prefix="POSTGRES_")


class AppConfig(BaseSettings):
    app_name: str = "Ozon"
    debug: bool = False
    host: str = "127.0.0.1"
    port: int = 5000

    api_v1_prefix: ApiV1Prefix = ApiV1Prefix()

    auth_jwt: AuthJWT = AuthJWT()

    user_role: UserRole = UserRole()

    user_admin_config: UserAdminConfig = UserAdminConfig()

    database_config: DatabaseConfig = DatabaseConfig()

    model_config = SettingsConfigDict(env_file=".env", extra="allow")


app_config = AppConfig()
