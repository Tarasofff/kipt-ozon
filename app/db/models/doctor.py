from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.table_names import TableNames
from app.db.models.base import Base
from app.db.models.mixins import TimestampMixin, IdIntPkMixin

if TYPE_CHECKING:
    from app.db.models import PatientDoctorDiagnose, User, Hospital


class Doctor(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.DOCTOR

    patient_doctor_diagnose: Mapped[list[PatientDoctorDiagnose]] = relationship(
        back_populates="doctor"
    )

    user: Mapped[User] = relationship(back_populates="doctor")

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.USER}.id"), nullable=False
    )

    hospital: Mapped[Hospital] = relationship(back_populates="doctor")

    hospital_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.HOSPITAL}.id"), nullable=False
    )
