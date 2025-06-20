from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.models.base import Base
from app.db.models.mixins import TimestampMixin, IdIntPkMixin
from app.db.table_names import TableNames

if TYPE_CHECKING:
    from app.db.models import Nurse, Patient


class Session(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.SESSION

    notes: Mapped[str] = mapped_column(String(64), nullable=False)

    nurse_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.NURSE}.id"), nullable=False
    )

    nurse: Mapped[Nurse] = relationship(back_populates="session")

    patient_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.PATIENT}.id"), nullable=False
    )

    patient: Mapped[Patient] = relationship(back_populates="session")
