from datetime import date, datetime
from typing import Any, Dict, Union
from fastapi.routing import APIRoute
from contextlib import asynccontextmanager
from fastapi import FastAPI
from pydantic import ConfigDict, model_validator
from app.services.bcrypt import BcryptService


@asynccontextmanager
async def log_registered_routes(app: FastAPI):
    print("\n📌 Registered routes:")
    for route in app.routes:
        if isinstance(route, APIRoute):
            methods = ", ".join(route.methods)
            print(f"{methods:10s} | {route.path}")
    print()
    yield


def to_date(value: Union[str, datetime, date]) -> date:
    if isinstance(value, str):
        return datetime.strptime(value, "%Y-%m-%d").date()
    elif isinstance(value, datetime):
        return value.date()
    return value


class PasswordHashMixin:
    model_config = ConfigDict(strict=True)

    @model_validator(mode="before")
    @classmethod
    def hash_password(cls, values: Dict[str, Any]) -> Dict[str, Any]:
        pwd = values.get("password")
        if pwd is None:
            return values

        bcrypt_service = BcryptService()
        values["password"] = bcrypt_service.hash_password(pwd)
        return values


# class BaseModelExcludeNone(BaseModel):
#     model_config = ConfigDict(strict=True)

#     def model_dump(self, *args: Any, **kwargs: Any) -> dict[str, Any]:
#         if "exclude_none" not in kwargs:
#             kwargs["exclude_none"] = True
#         return super().model_dump(*args, **kwargs)
