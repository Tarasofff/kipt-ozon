from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.table_names import TableNames
from app.db.models.base import Base
from app.db.models.patient_doctor import PatientDoctor
from app.db.models.mixins import TimestampMixin, IdIntPkMixin

if TYPE_CHECKING:
    from app.db.models import Patient, User


class Doctor(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.DOCTOR

    experience_years: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default=text("0"),
    )

    biography: Mapped[str] = mapped_column(String(1024), nullable=True)

    patients: Mapped[list[Patient]] = relationship(
        secondary=PatientDoctor, back_populates="doctors"
    )

    user: Mapped[User] = relationship(back_populates="doctor")

    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.USER}.id"), nullable=False
    )
