import PatientInfoModalWindow from '@/widgets/patient-info-modal-window';
import { useState } from 'react';

type Patient = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  email?: string | null;
  is_active: boolean;
  planned_session_count: number;
};

interface PatientsTableProps {
  patients: Patient[];
}

export default function PatientsTable({ patients }: PatientsTableProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow-lg">
        <table className="min-w-full border border-gray-700 text-sm text-left text-gray-200 bg-gray-900">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-gray-700">ID</th>
              <th className="px-4 py-3 border-b border-gray-700">Фамилия</th>
              <th className="px-4 py-3 border-b border-gray-700">Имя</th>
              <th className="px-4 py-3 border-b border-gray-700">Отчество</th>
              <th className="px-4 py-3 border-b border-gray-700">Телефон</th>
              <th className="px-4 py-3 border-b border-gray-700">Дата рождения</th>
              <th className="px-4 py-3 border-b border-gray-700">Email</th>
              <th className="px-4 py-3 border-b border-gray-700">Активен</th>
              <th className="px-4 py-3 border-b border-gray-700">План. сессии</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((user) => (
              <tr
                key={user.id}
                onClick={() => setSelectedPatient(user)}
                className="hover:bg-gray-800 transition-colors even:bg-gray-900 odd:bg-gray-950"
              >
                <td className="px-4 py-3 border-b border-gray-700">{user.id}</td>
                <td className="px-4 py-3 border-b border-gray-700">{user.last_name}</td>
                <td className="px-4 py-3 border-b border-gray-700">{user.first_name}</td>
                <td className="px-4 py-3 border-b border-gray-700">{user.middle_name}</td>
                <td className="px-4 py-3 border-b border-gray-700">{user.phone}</td>
                <td className="px-4 py-3 border-b border-gray-700">
                  {new Date(user.date_of_birth).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-4 py-3 border-b border-gray-700">
                  {user.email || <span className="text-gray-500 italic">нет</span>}
                </td>
                <td className="px-4 py-3 border-b border-gray-700">
                  {user.is_active ? (
                    <span className="px-2 py-1 bg-green-600/30 text-green-400 rounded-full text-xs">Активен</span>
                  ) : (
                    <span className="px-2 py-1 bg-red-600/30 text-red-400 rounded-full text-xs">Неактивен</span>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-gray-700 text-center">{user.planned_session_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PatientInfoModalWindow patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    </>
  );
}
