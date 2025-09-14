import { getReport } from '@/shared/api/report';

export const processingReport = async (
  token: string,
  tokenType: string,
  patientId: number,
  hospitalId: number,
  patientDoctorDiagnoseId: number,
  download = false,
) => {
  try {
    const response = await getReport(token, tokenType, patientId, hospitalId, patientDoctorDiagnoseId);

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    if (!download) {
      window.open(url, '_blank');
    } else {
      // создаём ссылку и имитируем клик для скачивания
      const link = document.createElement('a');
      link.href = url;
      link.download = `report_patient-${patientId}_hospital-${hospitalId}_diagnose-${patientDoctorDiagnoseId}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // освобождаем объект URL
      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.error('Ошибка при открытии отчета:', error);
    alert('Не удалось обработать отчет');
  }
};
