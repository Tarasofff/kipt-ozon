import axios from 'axios';
import { API_DEFAULT_URl } from '../constants/api';

export async function getReport(
  token: string,
  tokenType: string,
  patientId: number,
  hospitalId: number,
  patientDoctorDiagnoseId: number,
  download = false,
) {
  return axios
    .get(
      API_DEFAULT_URl +
        `/report/patient/${patientId}/hospital/${hospitalId}/patient-doctor-diagnose/${patientDoctorDiagnoseId}?disposition=${
          !download ? 'inline' : 'attachment'
        }`,
      { headers: { Authorization: `${tokenType} ${token}` }, responseType: 'blob' },
    )
    .then((res) => res);
}
