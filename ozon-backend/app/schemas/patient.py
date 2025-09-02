from datetime import date
from typing import Optional
from pydantic import BaseModel, ConfigDict


class PatientBaseSchema(BaseModel):
    first_name: str
    middle_name: str
    last_name: str
    phone: str
    date_of_birth: date
    email: Optional[str]
    planned_session_count: int
    is_active: bool


class PatientCreateSchema(PatientBaseSchema):
    model_config = ConfigDict(strict=True)


class PatientReadSchema(PatientBaseSchema):
    id: int

    model_config = ConfigDict(from_attributes=True)


class PatientUpdateSchema(BaseModel):
    first_name: Optional[str]
    middle_name: Optional[str]
    last_name: Optional[str]
    phone: Optional[str]
    date_of_birth: Optional[date]
    planned_session_count: Optional[int]

    model_config = ConfigDict(strict=True)
