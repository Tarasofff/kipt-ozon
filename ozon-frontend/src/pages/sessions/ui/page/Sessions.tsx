import SessionsTable from '@/widgets/sessions-table';

const sessions = [
  {
    id: 1,
    notes: 'Первая сессия',
    session_duration_ms: 3600000,
    ozone_concentration: 0.5,
    is_active: true,
    nurse_id: 2,
    patient_doctor_diagnose_id: 5,
    post_id: 1,
  },
  {
    id: 2,
    notes: null,
    session_duration_ms: 1800000,
    ozone_concentration: 0.3,
    is_active: false,
    nurse_id: 3,
    patient_doctor_diagnose_id: 6,
    post_id: 2,
  },
];

export default function Sessions() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">Сессии</h1>
      <SessionsTable sessions={sessions} />
    </div>
  );
}
