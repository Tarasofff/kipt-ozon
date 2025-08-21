from __future__ import annotations
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from app.db.models.base import Base
from app.db.models.mixins import IdIntPkMixin, TimestampMixin
from app.db.table_names import TableNames
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from app.db.models import Department, Post


class Cabinet(IdIntPkMixin, TimestampMixin, Base):
    __tablename__ = TableNames.CABINET

    number: Mapped[str] = mapped_column(String(256), nullable=False)

    department: Mapped[Department] = relationship(back_populates="cabinet")

    department_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableNames.DEPARTMENT}.id"), nullable=False
    )

    post: Mapped[list[Post]] = relationship(back_populates="cabinet")

    __table_args__ = (
        UniqueConstraint(
            "department_id",
            "number",
        ),
    )
