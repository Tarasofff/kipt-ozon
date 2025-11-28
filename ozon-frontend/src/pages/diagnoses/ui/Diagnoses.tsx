import { useTypedDispatch, useTypedSelector } from '@/app/store';
import { fetchDiagnosesRequest } from '@/entities/diagnose/models/slice/diagnosesSlice';
import DiagnosesTable from '@/pages/diagnoses/components/DiagnosesTable';
import SaveDiagnoseModalWindow from '@/widgets/save-diagnose-modal-window';
import { useEffect, useMemo, useState } from 'react';
import { BiFilterAlt, BiPlus, BiX, BiRefresh } from 'react-icons/bi';

interface FiltersState {
  name: string;
}

export default function Diagnoses() {
  const dispatch = useTypedDispatch();
  const { data, loading, error } = useTypedSelector((state) => state.diagnoses);
  const basePaginationParams = { limit: 15, offset: 0 };
  // сортировка по id
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // показать/скрыть блок фильтра
  const [showFilters, setShowFilters] = useState(false);

  // состояния фильтров
  const [filters, setFilters] = useState<FiltersState>({
    name: '',
  });

  // модалка добавления диагнозов
  const [isAddDiagnoseOpen, setIsAddDiagnoseOpen] = useState(false);

  // функция обновления фильтров
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // запрос диагнозов
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchDiagnosesRequest(basePaginationParams));
    }
  }, [dispatch, data]);

  // отфильтрованные и отсортированные диагнозы
  const filteredDiagnoses = useMemo(() => {
    let result = [...data];

    result = result.filter((diagnose) => {
      return diagnose.name.toLowerCase().includes(filters.name.toLowerCase());
    });

    result.sort((a, b) => (sortOrder === 'asc' ? a.id - b.id : b.id - a.id));

    return result;
  }, [data, filters, sortOrder]);

  //TODO page loader
  if (loading) return <div className="text-white p-8">Загрузка диагнозов...</div>;

  //TODO err
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

        {/* кнопка  добавить диагноз */}
        <button
          onClick={() => setIsAddDiagnoseOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition text-lg"
        >
          <BiPlus className="text-xl" />
          Добавить диагноз
        </button>

        {/* модалка */}
        <SaveDiagnoseModalWindow isOpen={isAddDiagnoseOpen} onClose={() => setIsAddDiagnoseOpen(false)} />

        {/* кнопка  Обновить таблицу */}
        <button
          onClick={() => dispatch(fetchDiagnosesRequest(basePaginationParams))}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition text-lg"
        >
          <BiRefresh className="text-xl" />
          Обновить таблицу
        </button>
      </div>

      {/* панель фильтра */}
      {showFilters && (
        <div className="bg-gray-900 p-4 rounded-xl mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6 animate-fadeIn">
          <input
            type="text"
            placeholder="Название"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
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

      <DiagnosesTable data={filteredDiagnoses} />
    </div>
  );
}
