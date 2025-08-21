from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.db.models import Hospital, Cabinet


class Department(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.DEPARTMENT

    name: Mapped[str] = mapped_column(String(256), nullable=False)

    hospital: Mapped[Hospital] = relationship(back_populates="department")

    hospital_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.HOSPITAL}.id"), nullable=False
    )

    cabinet: Mapped[list[Cabinet]] = relationship(back_populates="department")

    __table_args__ = (
        UniqueConstraint(
            "hospital_id",
            "name",
        ),
    )
