from datetime import date, datetime
from typing import Any
from fastapi.routing import APIRoute
from contextlib import asynccontextmanager
from fastapi import FastAPI
from pydantic import field_validator


@asynccontextmanager
async def log_registered_routes(app: FastAPI):
    print("\n📌 Registered routes:")
    for route in app.routes:
        if isinstance(route, APIRoute):
            methods = ", ".join(route.methods)
            print(f"{methods:10s} | {route.path}")
    print()
    yield


def to_date(date_str: str) -> date:
    return datetime.strptime(date_str, "%d.%m.%Y").date()


def get_current_date():
    today = datetime.today()
    return today.strftime("%d.%m.%Y")


class DateParser:
    @field_validator("date_of_birth", mode="before")
    @staticmethod
    def parse(dob: Any) -> date | None:
        if isinstance(dob, str):
            try:
                return to_date(dob)
            except ValueError:
                return None
        elif isinstance(dob, date):
            return dob
        return None


# class BaseModelExcludeNone(BaseModel):
#     model_config = ConfigDict(strict=True)

#     def model_dump(self, *args: Any, **kwargs: Any) -> dict[str, Any]:
#         if "exclude_none" not in kwargs:
#             kwargs["exclude_none"] = True
#         return super().model_dump(*args, **kwargs)
