import { lazy } from 'react';
import DiagnosesTable from './DiagnosesTable';

const SaveDiagnoseModalWindow = lazy(() => import('./SaveDiagnoseModalWindow'));

export { DiagnosesTable, SaveDiagnoseModalWindow };
