import { useTypedSelector } from '@/app/store';
import { Patient } from '@/features/patients/model/patientsSlice';
import { processingReport } from '@/services/report/report';
import { getReport } from '@/shared/api/report';

interface PatientInfoModalWindowProps {
  patient: Patient | null;
  onClose: () => void;
}

export default function PatientInfoModalWindow({ patient, onClose }: PatientInfoModalWindowProps) {
  if (!patient) return null;

  const { token, tokenType } = useTypedSelector((state) => state.auth);

  if (!token || !tokenType) throw new Error('Not authorized');

  const handleDownloadReport = async () => {
    await processingReport(token, tokenType, 1, 1, 1, true); //TODO
  };

  const handleViewReport = async () => {
    await processingReport(token, tokenType, 1, 1, 1); //TODO
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-lg p-6 relative transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose}>
          ✕
        </button>

        {/* Информация о пациенте */}
        <h2 className="text-2xl font-bold mb-4">Пациент #{patient.id}</h2>
        <div className="space-y-2 mb-6">
          <p>
            <strong>Фамилия:</strong> {patient.last_name}
          </p>
          <p>
            <strong>Имя:</strong> {patient.first_name}
          </p>
          <p>
            <strong>Отчество:</strong> {patient.middle_name}
          </p>
          <p>
            <strong>Телефон:</strong> {patient.phone}
          </p>
          <p>
            <strong>Email:</strong> {patient.email || 'нет'}
          </p>
          <p>
            <strong>Дата рождения:</strong> {new Date(patient.date_of_birth).toLocaleDateString('ru-RU')}
          </p>
          <p>
            <strong>Активен:</strong> {patient.is_active ? 'Да' : 'Нет'}
          </p>
          <p>
            <strong>План. сессии:</strong> {patient.planned_session_count}
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleViewReport}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Смотреть отчет
          </button>
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            Скачать отчет
          </button>
        </div>
      </div>
    </div>
  );
}
