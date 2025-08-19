from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import String
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship


if TYPE_CHECKING:
    from app.db.models import City


class Country(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.COUNTRY

    name: Mapped[str] = mapped_column(
        String(256),
        nullable=False,
        unique=True,
        index=True,
    )

    city: Mapped[list[City]] = relationship(back_populates="country")
