from typing import Any, Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.db.models import Patient
from sqlalchemy.orm import selectinload
from app.db.models import PatientDoctorDiagnose, Doctor, User, Diagnose, Session, Post, Cabinet, Hospital


class PatientRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_by_id(self, id: int, relations: bool = False) -> Optional[Patient]:
        stmt = select(Patient).where(Patient.id == id)

        if relations:
            stmt = stmt.options(
                selectinload(Patient.patient_doctor_diagnose)
                .load_only(PatientDoctorDiagnose.id)
                .joinedload(PatientDoctorDiagnose.doctor)
                .load_only(Doctor.id)
                .joinedload(Doctor.user)
                .load_only(User.id, User.first_name, User.last_name, User.middle_name, User.phone, User.email),
                selectinload(Patient.patient_doctor_diagnose)
                .load_only(PatientDoctorDiagnose.id)
                .joinedload(PatientDoctorDiagnose.diagnose)
                .load_only(
                    Diagnose.id, Diagnose.name
                ),
                selectinload(Patient.patient_doctor_diagnose)
                .load_only(PatientDoctorDiagnose.id)
                .joinedload(PatientDoctorDiagnose.session)
                .load_only(
                    Session.id,
                    Session.notes,
                    Session.is_active,
                    Session.session_duration_ms,
                    Session.ozone_concentration
                )
                .joinedload(Session.post)
                .load_only(Post.id, Post.number)
                .joinedload(Post.cabinet)
                .load_only(Cabinet.id, Cabinet.number)
                .joinedload(Cabinet.hospital)
                .load_only(Hospital.id, Hospital.name, Hospital.number)
                .joinedload(Hospital.address)
            )

        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_all(self, offset: int = 0, limit: int = 100) -> List[Patient]:
        stmt = select(Patient).offset(offset).limit(limit)
        result = await self.session.execute(stmt)
        patients = result.scalars().all()
        return list(patients)

    async def create(self, patient: Patient) -> Patient:
        self.session.add(patient)
        await self.session.flush()
        return patient

    async def update(
        self,
        id: int,
        fields_to_update: dict[str, Any],
    ) -> Optional[Patient]:
        stmt = (
            update(Patient)
            .where(Patient.id == id)
            .values(**fields_to_update)
            .execution_options(synchronize_session="fetch")
        )

        await self.session.execute(stmt)
        return await self.get_by_id(id)
