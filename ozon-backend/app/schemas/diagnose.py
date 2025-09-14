from typing import Optional
from pydantic import BaseModel, ConfigDict


class DiagnoseBaseSchema(BaseModel):
    name: str


class DiagnoseReadSchema(DiagnoseBaseSchema):
    id: int

    model_config = ConfigDict(from_attributes=True)


class AllDiagnosesResponseSchema(BaseModel):
    diagnoses: Optional[list[DiagnoseReadSchema]]
    total: int
    limit: int
    offset: int
