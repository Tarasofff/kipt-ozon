import { createQuery } from '@/shared/lib/query/queryUtils';

const index = '/patient';

export const PATIENT_API = {
  INDEX: index,
  GET_BY_ID: (patientId: number) => `${index}/${patientId}`,
  GET_REPORT: (patientId: number, hospitalId: number, patientDoctorDiagnoseId: number, download: boolean) =>
    `${index}/report${createQuery({
      patient_id: patientId,
      hospital_id: hospitalId,
      patient_doctor_diagnose_id: patientDoctorDiagnoseId,
      disposition: !download ? 'inline' : 'attachment',
    })}`,
};
