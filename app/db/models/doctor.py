from __future__ import annotations
from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.table_names import TableNames
from app.db.models.base import Base
from app.db.models.mixins import TimestampMixin, IdIntPkMixin

if TYPE_CHECKING:
    from app.db.models import PatientDoctorDiagnose


class Doctor(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.DOCTOR

    first_name: Mapped[str] = mapped_column(String(64), nullable=False)

    middle_name: Mapped[str] = mapped_column(String(64), nullable=False)

    last_name: Mapped[str] = mapped_column(String(64), nullable=False)

    phone: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
        unique=True,
        index=True,
    )

    email: Mapped[str] = mapped_column(String(length=320), nullable=True)

    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)

    work_since: Mapped[date] = mapped_column(Date, nullable=True)

    patient_doctor_diagnose: Mapped[list[PatientDoctorDiagnose]] = relationship(
        back_populates="doctor"
    )
