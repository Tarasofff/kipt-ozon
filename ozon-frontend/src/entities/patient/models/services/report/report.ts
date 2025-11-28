import { getPatientReport } from '@/entities/patient/api/requests';

export const processingReport = async (
  patientId: number,
  hospitalId: number,
  patientDoctorDiagnoseId: number,
  download = false,
) => {
  try {
    const response = await getPatientReport(patientId, hospitalId, patientDoctorDiagnoseId, download);

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    if (!download) {
      window.open(url, '_blank');
    } else {
      const link = document.createElement('a');

      link.href = url;
      link.download = `report_patient-${patientId}_hospital-${hospitalId}_diagnose-${patientDoctorDiagnoseId}_${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }
  } catch (error) {
    console.log('Ошибка при открытии отчета:', error);
    alert('Не удалось обработать отчет');
  }
};
