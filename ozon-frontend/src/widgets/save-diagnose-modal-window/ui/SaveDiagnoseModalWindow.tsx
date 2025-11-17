import { RootState } from '@/app/store';
import { createDiagnoseRequest } from '@/entities/diagnose/slice/diagnosesSlice';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface SaveDiagnoseModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateDiagnose {
  name: string;
}

export default function SaveDiagnoseModalWindow({ isOpen, onClose }: SaveDiagnoseModalWindowProps) {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user)
    return (
      <div>
        <h1>Unauthorized</h1>
      </div>
    );

  const dispatch = useDispatch();

  const [form, setForm] = useState<CreateDiagnose>({
    name: '',
  });

  const handleClear = () => {
    setForm({
      name: '',
    });
  };

  // Проверяем обязательные поля
  const isFormValid = form.name && form.name.trim().length >= 3;

  const handleSubmit = () => {
    if (isFormValid) {
      dispatch(createDiagnoseRequest(form));
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
        <Dialog.Title className="text-2xl font-bold mb-4">Добавить диагноз</Dialog.Title>

        {/* Крестик закрытия */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold">
          ✕
        </button>

        {/* контент модалки */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Название"
            title="Допустимы только буквы"
            required
            value={form.name}
            minLength={3}
            maxLength={128}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
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
