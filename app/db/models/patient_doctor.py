from sqlalchemy import Table, Column, ForeignKey, Integer
from app.db.table_names import TableNames
from app.db.models.base import Base


PatientDoctor = Table(
    TableNames.PATIENT_DOCTOR,
    Base.metadata,
    Column(
        f"{TableNames.PATIENT}_id",
        Integer,
        ForeignKey(f"{TableNames.PATIENT}.id"),
        primary_key=True,
        nullable=False,
    ),
    Column(
        f"{TableNames.DOCTOR}_id",
        Integer,
        ForeignKey(f"{TableNames.DOCTOR}.id"),
        primary_key=True,
        nullable=False,
    ),
)
