import { useTypedDispatch, useTypedSelector } from '@/app/store';
import { fetchDoctorsRequest } from '@/features/doctors/slice/doctorsSlice';
import { fetchPatientsRequest } from '@/features/patients/slice/patientsSlice';
import PatientsTable from '@/widgets/patient-table';
import SavePatientModalWindow from '@/widgets/save-patient-modal-window/ui/SavePatientModalWindow';
import { useState, useMemo, useEffect } from 'react';
import { BiFilterAlt, BiX, BiRefresh } from 'react-icons/bi';

export default function Patients() {
  const dispatch = useTypedDispatch();
  const { list: patients, loading, error } = useTypedSelector((state) => state.patients);

  // состояния фильтров
  const [filters, setFilters] = useState({
    last_name: '',
    first_name: '',
    middle_name: '',
    phone: '',
    date_of_birth: '',
    email: '',
    is_active: '',
  });

  // сортировка по id
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // показать/скрыть блок фильтра
  const [showFilters, setShowFilters] = useState(false);

  // функция обновления фильтров
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // модалка добавления пациентов
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  // запрос пациентов
  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatientsRequest());
    }
  }, [dispatch]);

  // отфильтрованные и отсортированные пациенты
  const filteredPatients = useMemo(() => {
    let result = [...patients];

    result = result.filter((p) => {
      return (
        p.last_name.toLowerCase().includes(filters.last_name.toLowerCase()) &&
        p.first_name.toLowerCase().includes(filters.first_name.toLowerCase()) &&
        p.middle_name.toLowerCase().includes(filters.middle_name.toLowerCase()) &&
        p.phone.includes(filters.phone) &&
        p.date_of_birth.includes(filters.date_of_birth) &&
        ((filters.email === '' && true) || (p.email?.toLowerCase().includes(filters.email.toLowerCase()) ?? false)) &&
        ((filters.is_active === '' && true) || (filters.is_active === 'true' ? p.is_active : !p.is_active))
      );
    });

    result.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));

    return result;
  }, [patients, filters, sortOrder]);

  if (loading) return <div className="text-white p-8">Загрузка пациентов...</div>;
  if (error) return <div className="text-red-400 p-8">Ошибка: {error}</div>;

  return (
    <div className="p-8 relative">
      <div className="flex justify-start -mb-4 pt-10 pb-6 gap-3">
        {/* кнопка фильтра */}
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-400 text-black text-lg font-semibold shadow-md hover:bg-yellow-500 transition"
        >
          {showFilters ? (
            <>
              <BiX className="text-2xl" />
              Закрыть фильтр
            </>
          ) : (
            <>
              <BiFilterAlt className="text-2xl" />
              Фильтр
            </>
          )}
        </button>
        {/* кнопка добавить пациента */}
        <button
          onClick={() => setIsAddPatientOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition text-lg"
        >
          <span className="text-xl font-bold">+</span>
          Добавить пациента
        </button>

        {/* кнопка  Обновить таблицу */}
        <button
          onClick={() => dispatch(fetchPatientsRequest())}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition text-lg"
        >
          <BiRefresh className="text-xl" />
          Обновить таблицу
        </button>
      </div>

      {/* модалка */}
      <SavePatientModalWindow isOpen={isAddPatientOpen} onClose={() => setIsAddPatientOpen(false)} />

      {/* панель фильтра */}
      {showFilters && (
        <div className="bg-gray-900 p-4 rounded-xl mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6 animate-fadeIn">
          <input
            type="text"
            placeholder="Фамилия"
            value={filters.last_name}
            onChange={(e) => handleFilterChange('last_name', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Имя"
            value={filters.first_name}
            onChange={(e) => handleFilterChange('first_name', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Отчество"
            value={filters.middle_name}
            onChange={(e) => handleFilterChange('middle_name', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Телефон"
            value={filters.phone}
            onChange={(e) => handleFilterChange('phone', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="date"
            placeholder="Дата рождения"
            value={filters.date_of_birth}
            onChange={(e) => handleFilterChange('date_of_birth', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Email"
            value={filters.email}
            onChange={(e) => handleFilterChange('email', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <select
            value={filters.is_active}
            onChange={(e) => handleFilterChange('is_active', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Все</option>
            <option value="true">Активные</option>
            <option value="false">Неактивные</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="asc">Сортировать по ID ↑</option>
            <option value="desc">Сортировать по ID ↓</option>
          </select>
        </div>
      )}

      <PatientsTable patients={filteredPatients} />
    </div>
  );
}
