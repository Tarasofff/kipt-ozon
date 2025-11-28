import { lazy } from 'react';
import PatientsTable from './PatientsTable';
import PatientsFilterPanel from './PatientsFilterPanel';

const PatientInfoModalWindow = lazy(() => import('./PatientInfoModalWindow'));
const SavePatientModalWindow = lazy(() => import('./SavePatientModalWindow'));

export { PatientsTable, PatientInfoModalWindow, SavePatientModalWindow, PatientsFilterPanel };
