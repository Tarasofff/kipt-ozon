from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
    from app.db.models import City, Hospital


class Address(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.ADDRESS

    name: Mapped[str] = mapped_column(String(256), nullable=False)

    city_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.CITY}.id"), nullable=True
    )

    city: Mapped[City] = relationship(back_populates="address")

    hospital: Mapped[Hospital] = relationship(back_populates="address")
