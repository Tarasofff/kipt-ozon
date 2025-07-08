from __future__ import annotations
from typing import TYPE_CHECKING

from datetime import date
from sqlalchemy import Integer, String, Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.models.base import Base
from app.db.models.patient_doctor import PatientDoctor
from app.db.table_names import TableNames
from app.db.models.mixins import TimestampMixin, IdIntPkMixin

if TYPE_CHECKING:
    from app.db.models import Doctor, Session


class Patient(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.PATIENT

    first_name: Mapped[str] = mapped_column(String(64), nullable=False)

    middle_name: Mapped[str] = mapped_column(String(64), nullable=False)

    last_name: Mapped[str] = mapped_column(String(64), nullable=False)

    phone: Mapped[str] = mapped_column(String(64), nullable=False)

    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)

    email: Mapped[str] = mapped_column(String(length=320), nullable=True)

    planned_session_count: Mapped[int] = mapped_column(Integer, nullable=False)

    doctors: Mapped[list[Doctor]] = relationship(
        secondary=PatientDoctor, back_populates="patients"
    )

    session: Mapped[list[Session]] = relationship(back_populates="patient")
