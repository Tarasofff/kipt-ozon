from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import date


class UserSchema(BaseModel):
    id: int
    first_name: str
    middle_name: Optional[str]
    last_name: str
    phone: str

    model_config = ConfigDict(from_attributes=True)


class NurseSchema(BaseModel):
    id: int
    user: UserSchema

    model_config = ConfigDict(from_attributes=True)


class DepartmentSchema(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class CabinetSchema(BaseModel):
    id: int
    number: str
    department: DepartmentSchema

    model_config = ConfigDict(from_attributes=True)


class PostSchema(BaseModel):
    id: int
    number: int
    cabinet: CabinetSchema

    model_config = ConfigDict(from_attributes=True)


class SessionSchema(BaseModel):
    id: int
    notes: Optional[str]
    session_duration_ms: int
    ozone_concentration: float
    is_active: bool
    post: PostSchema
    nurse: NurseSchema

    model_config = ConfigDict(from_attributes=True)


class DiagnoseSchema(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class DoctorSchema(BaseModel):
    id: int
    user: UserSchema

    model_config = ConfigDict(from_attributes=True)


class PatientDoctorDiagnoseSchema(BaseModel):
    id: int
    doctor: DoctorSchema
    diagnose: DiagnoseSchema
    session: Optional[List[SessionSchema]]

    model_config = ConfigDict(from_attributes=True)


class HospitalSchema(BaseModel):
    id: int
    name: str
    number: Optional[int]

    model_config = ConfigDict(from_attributes=True)


class PatientSchema(BaseModel):
    id: int
    first_name: str
    middle_name: Optional[str]
    last_name: str
    phone: str
    email: Optional[str]
    date_of_birth: date
    is_active: bool
    planned_session_count: int
    patient_doctor_diagnose: Optional[List[PatientDoctorDiagnoseSchema]]
    hospital: Optional[HospitalSchema] = None

    model_config = ConfigDict(from_attributes=True)
