from pathlib import Path
from io import BytesIO
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML  # type: ignore
from sqlalchemy.ext.asyncio import AsyncSession
from app.repository import HospitalRepository, PatientRepository
from app.schemas.report import HospitalSchema, PatientSchema


BASE_DIR = Path(__file__).resolve().parent.parent
templates_dir = BASE_DIR / "templates"
env = Environment(loader=FileSystemLoader(templates_dir))


class ReportService:
    def __init__(self, session: AsyncSession):
        self.template_env = env
        self.base_dir = BASE_DIR
        self.session = session
        self.patient_repo = PatientRepository(session=session)
        self.hospital_repo = HospitalRepository(session=session)

    async def get_patient_data(
        self,
        id: int,
        hospital_id: int,
    ):
        patient_data = await self.patient_repo.get_data_for_report_table(
            id, hospital_id
        )
        
        if not patient_data:
            return None

        patient_dump = PatientSchema.model_validate(patient_data).model_dump()

        hospital_data = await self.hospital_repo.get_by_id(id=hospital_id)

        hospital_dump = HospitalSchema.model_validate(hospital_data).model_dump()

        return {**patient_dump, "hospital": hospital_dump}

    async def get_report_table_pdf_bytes(
        self, hospital: dict, records: list  # type: ignore
    ) -> BytesIO:

        # Рендерим HTML
        template = self.template_env.get_template("report_table.html")
        html_content = template.render(hospital=hospital, records=records)

        # Генерация PDF в памяти
        pdf_bytes = BytesIO()
        HTML(string=html_content, base_url=str(self.base_dir)).write_pdf(pdf_bytes)  # type: ignore
        pdf_bytes.seek(0)
        return pdf_bytes
