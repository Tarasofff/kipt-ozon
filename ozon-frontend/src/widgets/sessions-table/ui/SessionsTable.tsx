type Session = {
  id: number;
  notes?: string | null;
  session_duration_ms: number;
  ozone_concentration: number;
  is_active: boolean;
  nurse_id: number;
  patient_doctor_diagnose_id: number;
  post_id: number;
};

interface SessionsTableProps {
  sessions: Session[];
}

export default function SessionsTable({ sessions }: SessionsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="min-w-full border border-gray-700 text-sm text-left text-gray-200 bg-gray-900">
        {/* Заголовки */}
        <thead className="bg-gray-800 text-gray-300 uppercase text-xs font-semibold">
          <tr>
            <th className="px-4 py-3 border-b border-gray-700">ID</th>
            <th className="px-4 py-3 border-b border-gray-700">Заметки</th>
            <th className="px-4 py-3 border-b border-gray-700">Длительность (мс)</th>
            <th className="px-4 py-3 border-b border-gray-700">Конц. озона (mg/l)</th>
            <th className="px-4 py-3 border-b border-gray-700">Активна</th>
            <th className="px-4 py-3 border-b border-gray-700">ID медсестры</th>
            <th className="px-4 py-3 border-b border-gray-700">ID пациента/диагноза</th>
            <th className="px-4 py-3 border-b border-gray-700">ID поста</th>
          </tr>
        </thead>

        {/* Тело */}
        <tbody>
          {sessions.map((s) => (
            <tr key={s.id} className="hover:bg-gray-800 transition-colors even:bg-gray-900 odd:bg-gray-950">
              <td className="px-4 py-3 border-b border-gray-700">{s.id}</td>
              <td className="px-4 py-3 border-b border-gray-700">
                {s.notes || <span className="text-gray-500 italic">нет</span>}
              </td>
              <td className="px-4 py-3 border-b border-gray-700">{s.session_duration_ms}</td>
              <td className="px-4 py-3 border-b border-gray-700">{s.ozone_concentration}</td>
              <td className="px-4 py-3 border-b border-gray-700">
                {s.is_active ? (
                  <span className="px-2 py-1 bg-green-600/30 text-green-400 rounded-full text-xs">Активна</span>
                ) : (
                  <span className="px-2 py-1 bg-red-600/30 text-red-400 rounded-full text-xs">Неактивна</span>
                )}
              </td>
              <td className="px-4 py-3 border-b border-gray-700 text-center">{s.nurse_id}</td>
              <td className="px-4 py-3 border-b border-gray-700 text-center">{s.patient_doctor_diagnose_id}</td>
              <td className="px-4 py-3 border-b border-gray-700 text-center">{s.post_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
