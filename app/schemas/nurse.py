from pydantic import BaseModel, ConfigDict
from datetime import datetime


class NurseSchema(BaseModel):
    id: int
    first_name: str
    middle_name: str
    last_name: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
