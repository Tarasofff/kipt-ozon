from datetime import date, datetime
from typing import List, Union
from fastapi.routing import APIRoute
from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.config.config import app_config


@asynccontextmanager
async def log_registered_routes(app: FastAPI):
    print("\n📌 Registered routes:")
    for route in app.routes:
        if isinstance(route, APIRoute):
            methods = ", ".join(route.methods)
            print(f"{methods:10s} | {route.path}")
    print()
    yield


def get_user_role_list() -> List[str]:
    return [
        value
        for key, value in vars(type(app_config.user_role)).items()
        if key.isupper()
    ]


def to_date(value: Union[str, datetime, date]) -> date:
    if isinstance(value, str):
        return datetime.strptime(value, "%Y-%m-%d").date()
    elif isinstance(value, datetime):
        return value.date()
    return value
