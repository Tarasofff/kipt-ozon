from datetime import date, datetime
from typing import Union
from fastapi.routing import APIRoute
from contextlib import asynccontextmanager
from fastapi import FastAPI

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
