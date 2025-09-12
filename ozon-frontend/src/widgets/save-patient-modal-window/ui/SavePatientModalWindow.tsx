import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { handlePhoneInput, handleTextInput } from '@/utils/inputUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { fetchDoctorsRequest } from '@/features/doctors/slice/doctorsSlice';
import { fetchDiagnosesRequest } from '@/features/diagnoses/slice/diagnosesSlice';

interface SavePatientModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const getDoctorsState = () => {
  const doctors = useSelector((state: RootState) => state.doctors.doctors);
  const totalDoctors = useSelector((state: RootState) => state.doctors.total);
  const offsetDoctors = useSelector((state: RootState) => state.doctors.offset);
  const limitDoctors = useSelector((state: RootState) => state.doctors.limit);

  return { doctors, totalDoctors, offsetDoctors, limitDoctors };
};

const getDiagnosesState = () => {
  const diagnoses = useSelector((state: RootState) => state.diagnoses.diagnoses);
  const totalDiagnoses = useSelector((state: RootState) => state.diagnoses.total);
  const offsetDiagnoses = useSelector((state: RootState) => state.diagnoses.offset);
  const limitDiagnoses = useSelector((state: RootState) => state.diagnoses.limit);

  return { diagnoses, totalDiagnoses, offsetDiagnoses, limitDiagnoses };
};

export default function SavePatientModalWindow({ isOpen, onClose }: SavePatientModalWindowProps) {
  const { doctors, totalDoctors, offsetDoctors, limitDoctors } = getDoctorsState();
  const { diagnoses, totalDiagnoses, offsetDiagnoses, limitDiagnoses } = getDiagnosesState();
  const dispatch = useDispatch();

  const [isDiagnoseDropdownOpen, setIsDiagnoseDropdownOpen] = useState(false);
  const [isDoctorDropdownOpen, setIsDoctorDropdownOpen] = useState(false);

  const [form, setForm] = useState<{
    first_name: string | null;
    middle_name: string | null;
    last_name: string | null;
    phone: string | null;
    date_of_birth: string | null;
    email: string | null;
    doctor_id: number | null;
    diagnose_id: number | null;
  }>({
    first_name: null,
    middle_name: null,
    last_name: null,
    phone: null,
    date_of_birth: null,
    email: null,
    doctor_id: null,
    diagnose_id: null,
  });

  const handleChange = (field: string, value: string | number | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setForm({
      first_name: null,
      middle_name: null,
      last_name: null,
      phone: null,
      date_of_birth: null,
      email: null,
      doctor_id: null,
      diagnose_id: null,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    if (doctors.length === 0) {
      dispatch(fetchDoctorsRequest({ offset: 0, limit: 10 }));
    }

    if (diagnoses.length === 0) {
      dispatch(fetchDiagnosesRequest({ offset: 0, limit: 10 }));
    }
  }, [dispatch, isOpen]);

  //TODO test this
  const handleDoctorsScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;

    if (bottom && doctors.length < totalDoctors) {
      dispatch(fetchDoctorsRequest({ offset: offsetDoctors + limitDoctors, limit: limitDoctors }));
    }
  };

  //TODO test this
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

  //TODO
  const handleSubmit = () => {
    console.log('Отправка на сервер:', form);
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
            required
            value={form.first_name || ''}
            onChange={(e) => handleChange('first_name', e.target.value)}
            onBeforeInput={handleTextInput}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Фамилия"
            title="Допустимы только буквы"
            required
            value={form.last_name || ''}
            onChange={(e) => handleChange('last_name', e.target.value)}
            onBeforeInput={handleTextInput}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Отчество"
            title="Допустимы только буквы"
            required
            value={form.middle_name || ''}
            onChange={(e) => handleChange('middle_name', e.target.value)}
            onBeforeInput={handleTextInput}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="tel"
            placeholder="Телефон"
            title="Допустимы только цифры и знак +"
            required
            value={form.phone || ''}
            onBeforeInput={handlePhoneInput}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="date"
            required
            value={form.date_of_birth || ''}
            onChange={(e) => handleChange('date_of_birth', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            title="Допустима только электронная почта"
            placeholder="Email"
            value={form.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* TODO вынести в отдельный виджет */}
          {/* Кастомный dropdown для докторов */}
          <div className="relative">
            <button
              className={`w-full px-3 py-2 rounded-lg text-left bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400`}
              onClick={() => setIsDoctorDropdownOpen((prev) => !prev)}
            >
              {form.doctor_id
                ? `${doctors.find((doctor) => doctor.id === form.doctor_id)?.user.first_name} ${doctors.find(
                    (doctor) => doctor.id === form.doctor_id,
                  )?.user.middle_name} ${doctors.find((doctor) => doctor.id === form.doctor_id)?.user.last_name}`
                : 'Лечащий врач'}
            </button>
            {isDoctorDropdownOpen && (
              <div
                className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg"
                onScroll={handleDoctorsScroll}
              >
                <div
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    handleChange('doctor_id', null);
                    handleChange('diagnose_id', null);
                    setIsDoctorDropdownOpen(false);
                  }}
                >
                  Пусто
                </div>
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      handleChange('doctor_id', doctor.id);
                      setIsDoctorDropdownOpen(false);
                    }}
                  >
                    {doctor.user.first_name} {doctor.user.middle_name} {doctor.user.last_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TODO вынести в отдельный виджет */}
          {/* Диагноз - кастомный dropdown */}
          <div className="relative">
            <button
              disabled={!form.doctor_id}
              className={`w-full px-3 py-2 rounded-lg text-left bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                !form.doctor_id ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => form.doctor_id && setIsDiagnoseDropdownOpen((prev) => !prev)}
            >
              {form.diagnose_id ? diagnoses.find((diagnose) => diagnose.id === form.diagnose_id)?.name : 'Диагноз'}
            </button>

            {isDiagnoseDropdownOpen && (
              <div
                className="absolute z-10 mt-1 w-full max-h-40 overflow-y-auto bg-gray-800 border border-gray-700 rounded-lg"
                onScroll={handleDiagnosesScroll}
              >
                <div
                  className="p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => {
                    handleChange('diagnose_id', null);
                    setIsDiagnoseDropdownOpen(false);
                  }}
                >
                  Пусто
                </div>
                {diagnoses.map((diagnose) => (
                  <div
                    key={diagnose.id}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() => {
                      handleChange('diagnose_id', diagnose.id);
                      setIsDiagnoseDropdownOpen(false);
                    }}
                  >
                    {diagnose.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* OLD DOCTOR SELECTOR */}
          {/* <select
            value={form.doctor_id || ''}
            onChange={(e) => {
              const value = e.target.value;
              handleChange('doctor_id', value === '' ? null : Number(value));
            }}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="" disabled>
              Лечащий врач
            </option>
            <div className="h-40 overflow-y-auto border border-gray-700 rounded-lg" onScroll={handleDoctorsScroll}>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.user.first_name} {doctor.user.middle_name} {doctor.user.last_name}
                </option>
              ))}
            </div>
          </select> */}

          {/* OLD DIAGNOSE SELECTOR */}
          {/* <select
            disabled={!form.doctor_id}
            value={form.diagnose_id || ''}
            onChange={(e) => {
              const value = e.target.value;
              handleChange('diagnose_id', value === '' ? null : Number(value));
            }}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="" disabled>
              Диагноз
            </option>
            <div className="h-40 overflow-y-auto border border-gray-700 rounded-lg" onScroll={handleDiagnosesScroll}>
              {diagnoses.map((diagnose) => (
                <option key={diagnose.id} value={diagnose.id}>
                  {diagnose.name}
                </option>
              ))}
            </div>
          </select> */}
        </div>

        {/* кнопки */}
        <div className="flex justify-end gap-4 mt-6">
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
