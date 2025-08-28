from fastapi import APIRouter, Depends, status
from fastapi.responses import StreamingResponse
from app.config.config import app_config
from app.api.dependencies import (
    check_patient_exists,
    check_hospital_exists,
    check_patient_doctor_diagnose_exists,
)
from app.services import ReportService
from app.db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix=app_config.api_v1_prefix.report, tags=["Reports"])


def get_report_service(session: AsyncSession = Depends(get_session)) -> ReportService:
    return ReportService(session=session)


@router.get(
    "/patient/{patient_id}/hospital/{hospital_id}/patient-doctor-diagnose/{patient_doctor_diagnose_id}",
    status_code=status.HTTP_200_OK,
)
async def get_report(
    patient_id: int = Depends(check_patient_exists),
    hospital_id: int = Depends(check_hospital_exists),
    patient_doctor_diagnose_id: int = Depends(check_patient_doctor_diagnose_exists),
    report_service: ReportService = Depends(get_report_service),
):
    report_data_dump = await report_service.get_report_data(
        patient_id, hospital_id, patient_doctor_diagnose_id
    )

    pdf_bytes = await report_service.get_pdf_bytes(report_data_dump)

    media_type = "application/pdf"
    file_ext = "pdf"
    filename = f"report_patient_id_{patient_id}.{file_ext}"
    headers = {"Content-Disposition": f"inline; filename={filename}"}

    return StreamingResponse(
        pdf_bytes,
        media_type=media_type,
        headers=headers,
    )
