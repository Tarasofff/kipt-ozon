from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
    from app.db.models import City, Building


class Street(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.STREET

    name: Mapped[str] = mapped_column(String(256), nullable=False)

    city_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.CITY}.id"), nullable=False
    )

    city: Mapped[City] = relationship(back_populates="street")

    building: Mapped[list[Building]] = relationship(back_populates="street")

    __table_args__ = (
        UniqueConstraint(
            "name",
            "city_id",
        ),
    )
