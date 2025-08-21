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
    res = await report_service.get_patient_data(1, 1)
    return res


@router.get(
    "/patient-registry-table/{patient_id}/hospital/{hospital_id}",
    status_code=status.HTTP_200_OK,
)
async def get_patient_registry_table_report(
    patient_id: int,
    hospital_id: int,
    report_service: ReportService = Depends(get_report_service),
):

    patient = {
        "id": patient_id,
        "first_name": "Ivan",
        "middle_name": "Tarasov",
        "last_name": "Alexandrovich",
        "date_of_birth": "12.05.1985",
        "phone": "3800000000",
        "email": None,
        "is_active": False,
        "planned_session_count": 10,
        "patient_doctor_diagnose": {
            "id": 331,
            "doctor": {
                "id": 12,
                "user": {
                    "id": 33,
                    "first_name": "Maxim",
                    "middle_name": "Tarasov",
                    "last_name": "Petrovich",
                    "date_of_birth": "12.05.1985",
                    "phone": "3800000000",
                    "email": None,
                    "is_active": True,
                },
                "hospital": {
                    "name": "Харківська Обласна Клінічна Лікарня",
                    "number": 1,
                    "building": {
                        "id": 13,
                        "number": "15A",
                        "street": {
                            "id": 44,
                        },
                    },
                },
            },
        },
    }

    hospital = {
        "name": "Харківська Обласна Клінічна Лікарня #1",
        "address": "ул. Примерная, 1",
    }
    records = [
        {
            "registry_number": 142,
            "date": "19.08.2025",
            "full_name": patient["name"],
            "diagnose": "Инфицированный осколочный разрыв тканей предплечья",
            "session_duration": "30 мин",
            "session_count": 10,
            "sessions_done": 5,
        },
        {
            "registry_number": 143,
            "date": "20.08.2025",
            "full_name": patient["name"],
            "diagnose": "Ожог левого бедра 2-й степени",
            "session_duration": "45 мин",
            "session_count": 8,
            "sessions_done": 3,
        },
    ]

    pdf_bytes = await report_service.get_report_table_pdf_bytes(  # type: ignore
        hospital, records
    )
    media_type = "application/pdf"
    headers = {
        "Content-Disposition": f"inline; filename=report_patient_id_{patient_id}.pdf"
    }

    return StreamingResponse(
        pdf_bytes,
        media_type=media_type,
        headers=headers,
    )
