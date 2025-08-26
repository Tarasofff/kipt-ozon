from fastapi import APIRouter, Depends, status
from fastapi.responses import StreamingResponse
from app.config.config import app_config
from app.services import ReportService
from app.db.session import get_session
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix=app_config.api_v1_prefix.report, tags=["Reports"])


def get_report_service(session: AsyncSession = Depends(get_session)) -> ReportService:
    return ReportService(session=session)


@router.get("/test", status_code=status.HTTP_200_OK)
async def test(report_service: ReportService = Depends(get_report_service)):
    res = await report_service.get_report_data(1, 1, 1)
    return res


@router.get(
    "/patient-session-report/{patient_id}/hospital/{hospital_id}/patient-doctor-diagnose/{patient_doctor_diagnose_id}",
    status_code=status.HTTP_200_OK,
)
async def get_patient_session_report(
    patient_id: int,
    hospital_id: int,
    patient_doctor_diagnose_id: int,
    report_service: ReportService = Depends(get_report_service),
):
    report_data = await report_service.get_report_data(
        patient_id, hospital_id, patient_doctor_diagnose_id
    )

    pdf_bytes = await report_service.get_report_table_pdf_bytes(report_data)  # type: ignore

    media_type = "application/pdf"
    headers = {
        "Content-Disposition": f"inline; filename=report_patient_id_{patient_id}.pdf"
    }

    return StreamingResponse(
        pdf_bytes,
        media_type=media_type,
        headers=headers,
    )
