from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
    from app.db.models import Street, Country


class City(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.CITY

    name: Mapped[str] = mapped_column(String(256), nullable=False)

    county_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.COUNTRY}.id"), nullable=False
    )

    country: Mapped[Country] = relationship(back_populates="city")

    street: Mapped[list[Street]] = relationship(back_populates="city")

    __table_args__ = (
        UniqueConstraint(
            "name",
            "county_id",
        ),
    )
