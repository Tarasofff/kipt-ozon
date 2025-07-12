from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
    from app.db.models import Country, Address


class City(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.CITY

    name: Mapped[str] = mapped_column(String(256), nullable=False)

    county_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.COUNTRY}.id"), nullable=True
    )

    country: Mapped[Country] = relationship(back_populates="city")

    address: Mapped[list[Address]] = relationship(back_populates="city")
