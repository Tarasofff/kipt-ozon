from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
    from app.db.models import Street, Hospital


class Building(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.BUILDING

    number: Mapped[str] = mapped_column(String(256), nullable=False)

    street_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.STREET}.id"), nullable=False
    )

    street: Mapped[Street] = relationship(back_populates="building")

    hospital: Mapped[list[Hospital]] = relationship(back_populates="building")

    __table_args__ = (
        UniqueConstraint(
            "number",
            "street_id",
        ),
    )
