import { useState } from 'react';
import { BiFilterAlt, BiX, BiPlus } from 'react-icons/bi';
import { PatientsFilterPanel, PatientsTable, SavePatientModalWindow } from '../components';
import { useTypedDispatch, useTypedSelector } from '@/app/store';
import ComponentWrapper from '@/shared/ui/component-wrapper/ComponentWrapper';
import { isPatientFilterOpen } from '@/entities/patient/models/slice/patientsSlice';

export default function Patients() {
  const dispatch = useTypedDispatch();
  const { data, loading, error, filter } = useTypedSelector((state) => state.patients);

  //TODO store
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);

  return (
    <ComponentWrapper loading={loading} error={error}>
      <div className="p-8 relative">
        <div className="flex justify-start -mb-4 pt-10 pb-6 gap-3">
          {/* кнопка фильтра */}
          <button
            onClick={() => dispatch(isPatientFilterOpen(!filter.isOpen))}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-400 text-black text-lg font-semibold shadow-md hover:bg-yellow-500 transition"
          >
            {filter.isOpen ? (
              <button className="flex">
                <BiX className="text-2xl" />
                Закрыть фильтр
              </button>
            ) : (
              <button className="flex">
                <BiFilterAlt className="text-2xl" />
                Фильтр
              </button>
            )}
          </button>

          {/* кнопка добавить пациента */}
          <button
            onClick={() => setIsAddPatientOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition text-lg"
          >
            <BiPlus className="text-xl" />
            Добавить пациента
          </button>
        </div>

        {/* TODO memo */}
        {/* модалка добавления пациента */}
        <SavePatientModalWindow isOpen={isAddPatientOpen} onClose={() => setIsAddPatientOpen(false)} />

        {/* панель фильтра */}
        {filter.isOpen && <PatientsFilterPanel fields={filter.fields} />}

        {/* таблица пациентов */}
        <PatientsTable data={data} />
      </div>
    </ComponentWrapper>
  );
}
