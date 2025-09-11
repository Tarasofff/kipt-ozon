import PatientsTable from '@/widgets/patient-table';
import { useState, useMemo } from 'react';
import { BiFilterAlt } from 'react-icons/bi'; // значок фильтра

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

const initialPatients: Patient[] = [
  {
    id: 1,
    first_name: 'Иван',
    middle_name: 'Иванович',
    last_name: 'Петров',
    phone: '+380991112233',
    date_of_birth: '1990-01-01',
    email: 'ivan.petrov@example.com',
    is_active: true,
    planned_session_count: 5,
  },
  {
    id: 2,
    first_name: 'Анна',
    middle_name: 'Сергеевна',
    last_name: 'Кузнецова',
    phone: '+380931234567',
    date_of_birth: '1985-06-15',
    email: null,
    is_active: false,
    planned_session_count: 2,
  },
];

export default function Patients() {
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

  // функция обновления фильтров
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // отфильтрованные и отсортированные пациенты
  const filteredPatients = useMemo(() => {
    let result = [...initialPatients];

    // фильтрация
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

    // сортировка по id
    result.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));

    return result;
  }, [filters, sortOrder]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <BiFilterAlt className="text-yellow-400" />
        Фильтр пациентов
      </h1>

      <div className="bg-gray-900 p-4 rounded-xl mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
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

      <PatientsTable patients={filteredPatients} />
    </div>
  );
}
