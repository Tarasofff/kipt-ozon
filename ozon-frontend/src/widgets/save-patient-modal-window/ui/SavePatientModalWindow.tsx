import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { handlePhoneInput, handleTextInput } from '@/shared/lib/input/inputUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { fetchDiagnosesRequest } from '@/entities/diagnose/slice/diagnosesSlice';
import { createPatientRequest } from '@/entities/patient/models/slice/patientsSlice';

interface SavePatientModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const getDiagnosesState = () => {
  const diagnoses = useSelector((state: RootState) => state.diagnoses.diagnoses);
  const totalDiagnoses = useSelector((state: RootState) => state.diagnoses.total);
  const offsetDiagnoses = useSelector((state: RootState) => state.diagnoses.offset);
  const limitDiagnoses = useSelector((state: RootState) => state.diagnoses.limit);

  return { diagnoses, totalDiagnoses, offsetDiagnoses, limitDiagnoses };
};

export default function SavePatientModalWindow({ isOpen, onClose }: SavePatientModalWindowProps) {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user)
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );

  const { diagnoses, totalDiagnoses, offsetDiagnoses, limitDiagnoses } = getDiagnosesState();

  const dispatch = useDispatch();

  const [isDiagnoseDropdownOpen, setIsDiagnoseDropdownOpen] = useState<number | null>(null);

  const [form, setForm] = useState<CreatePatient>({
    first_name: '',
    middle_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    email: '',
    user_id: user.id,
    diagnose_ids: [],
    notes: '',
  });

  const handleClear = () => {
    setForm({
      first_name: '',
      middle_name: '',
      last_name: '',
      phone: '',
      date_of_birth: '',
      email: '',
      user_id: user.id,
      diagnose_ids: [],
      notes: '',
    });
  };

  useEffect(() => {
    if (isOpen && diagnoses.length === 0) {
      dispatch(fetchDiagnosesRequest({ offset: 0, limit: 15 }));
    }
  }, [dispatch, isOpen]);

  const handleDiagnosesScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;

    if (bottom && diagnoses.length < totalDiagnoses) {
      dispatch(fetchDiagnosesRequest({ offset: offsetDiagnoses + limitDiagnoses, limit: limitDiagnoses }));
    }
  };

  // Проверяем обязательные поля
  const isFormValid =
    form.first_name &&
    form.first_name.trim().length >= 2 &&
    form.middle_name &&
    form.middle_name.trim().length >= 2 &&
    form.last_name &&
    form.last_name.trim().length >= 2 &&
    form.phone &&
    form.phone.trim().length >= 8 &&
    form.date_of_birth &&
    form.date_of_birth.trim() !== '';

  const handleSubmit = () => {
    if (isFormValid) {
      dispatch(createPatientRequest(form));
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Фон для клика вне модалки */}
      <div className="fixed inset-0" onClick={onClose}></div>

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-900 text-white rounded-2xl p-6 w-full max-w-lg shadow-lg"
      >
        <Dialog.Title className="text-2xl font-bold mb-4">Добавить пациента</Dialog.Title>

        {/* Крестик закрытия */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">
          ✕
        </button>

        {/* контент модалки */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Имя"
            title="Допустимы только буквы"
            minLength={2}
            maxLength={32}
            required
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            onBeforeInput={handleTextInput}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            minLength={2}
            maxLength={32}
            placeholder="Фамилия"
            title="Допустимы только буквы"
            required
            value={form.middle_name}
            onChange={(e) => setForm({ ...form, middle_name: e.target.value })}
            onBeforeInput={handleTextInput}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            minLength={2}
            maxLength={32}
            placeholder="Отчество"
            title="Допустимы только буквы"
            required
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            onBeforeInput={handleTextInput}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="tel"
            minLength={8}
            maxLength={14}
            placeholder="Телефон"
            title="Допустимы только цифры и знак +"
            required
            value={form.phone}
            onBeforeInput={handlePhoneInput}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="date"
            required
            value={form.date_of_birth}
            onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            minLength={4}
            maxLength={32}
            title="Допустима только электронная почта"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <div className="space-y-3">
            {form.diagnose_ids.map((diagnose_data, index) => (
              <div key={index} className="relative flex items-center gap-2">
                <div className="relative w-full">
                  <button
                    type="button"
                    className="w-full px-3 py-2 rounded-lg text-left bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    onClick={() => setIsDiagnoseDropdownOpen((prev) => (prev === index ? null : index))}
                  >
                    {diagnose_data
                      ? diagnoses.find((diagnose) => diagnose.id === diagnose_data.id)?.name || 'Выберите диагноз'
                      : 'Выберите диагноз'}
                  </button>

                  {isDiagnoseDropdownOpen === index && (
                    <div
                      className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg"
                      onScroll={handleDiagnosesScroll}
                    >
                      {/* Пустой вариант */}
                      <div
                        className="p-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() => {
                          const updated = [...form.diagnose_ids];
                          updated[index] = { id: null, planned_session_count: 0 };
                          setForm({ ...form, diagnose_ids: updated });
                          setIsDiagnoseDropdownOpen(null);
                        }}
                      >
                        Пусто
                      </div>

                      {/* Список диагнозов */}
                      {diagnoses.map((d) => (
                        <div
                          key={d.id}
                          className="p-2 hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            const updated = [...form.diagnose_ids];
                            updated[index] = { ...updated[index], id: d.id };
                            setForm({ ...form, diagnose_ids: updated });
                            setIsDiagnoseDropdownOpen(null);
                          }}
                        >
                          {d.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* input для planned_session_count */}
                <input
                  type="number"
                  min={0}
                  disabled={diagnose_data.id === null}
                  value={diagnose_data.planned_session_count || undefined}
                  onChange={(e) => {
                    const updated = [...form.diagnose_ids];
                    updated[index] = { ...updated[index], planned_session_count: Number(e.target.value) };
                    setForm({ ...form, diagnose_ids: updated });
                  }}
                  className="w-24 px-2 py-1 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Сессий"
                />

                <button
                  type="button"
                  onClick={() => {
                    const updated = form.diagnose_ids.filter((_, i) => i !== index);
                    setForm({ ...form, diagnose_ids: updated });
                  }}
                  className="px-2 py-1 bg-red-600 rounded-lg hover:bg-red-500 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3">
          <textarea
            placeholder="Заметки"
            value={form.notes}
            maxLength={1024}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
            rows={4}
          />
        </div>

        {/* кнопки */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() =>
              setForm({ ...form, diagnose_ids: [...form.diagnose_ids, { id: null, planned_session_count: 0 }] })
            }
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
          >
            Добавить диагноз
          </button>
          <button onClick={handleClear} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
            Очистить
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid} // блокируем, если форма невалидна
            className={`px-6 py-2 font-bold rounded-lg transition
    ${
      isFormValid
        ? 'bg-yellow-400 text-black hover:bg-yellow-500'
        : 'bg-gray-500 text-gray-300 cursor-not-allowed opacity-70'
    }`}
          >
            Сохранить
          </button>
        </div>
      </div>
    </Dialog>
  );
}
