from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, ForeignKey, Integer, String, text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.models.base import Base
from app.db.models.mixins import TimestampMixin, IdIntPkMixin
from app.db.table_names import TableNames

if TYPE_CHECKING:
    from app.db.models import Nurse, Patient, Post


class Session(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.SESSION

    notes: Mapped[str] = mapped_column(String(64), nullable=False)

    session_number: Mapped[int] = mapped_column(
        Integer, nullable=False, comment="session ordinal number"
    )

    session_duration_ms: Mapped[int] = mapped_column(
        Integer, nullable=False, comment="Session duration in ms"
    )

    # TODO "mg/l" ????
    ozone_concentration: Mapped[int] = mapped_column(
        Integer, nullable=False, comment="mg/l"
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False, server_default=text("false")
    )

    nurse_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.NURSE}.id"), nullable=False
    )

    nurse: Mapped[Nurse] = relationship(back_populates="session")

    patient_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.PATIENT}.id"), nullable=False
    )

    patient: Mapped[Patient] = relationship(back_populates="session")

    post: Mapped[Post] = relationship(back_populates="session")

    post_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.POST}.id"), nullable=False
    )
