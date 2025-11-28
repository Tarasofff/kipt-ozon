import { useTypedDispatch } from '@/app/store';
import {
  clearPatients,
  fetchPatientsRequest,
  resetPatientFilterFields,
  setPatientFilterFields,
} from '@/entities/patient/models/slice/patientsSlice';
import { PatientsFilterFields } from '@/entities/patient/models/type/patientStateType';
import { PatientsFilterQuery } from '@/entities/patient/models/type/patientType';
import { useKeyboardNavigation } from '@/shared/hooks/useKeyboardNavigation';
import { inputTypeHandlers } from '@/shared/lib/input/inputUtils';
import { InputFieldConfig } from '@/shared/type/inputType';
import React, { useMemo } from 'react';
import { BiSearch, BiX } from 'react-icons/bi';

interface PatientsFilterPanelProps {
  fields: PatientsFilterFields;
}

const fieldTypes: Record<keyof PatientsFilterFields, InputFieldConfig> = {
  is_active: {
    element: 'select',
    options: [
      { value: '', label: 'Все пациенты' },
      { value: 'true', label: 'Активные' },
      { value: 'false', label: 'Неактивные' },
    ],
  },
  last_name: { element: 'input', type: 'text', placeholder: 'Отчество' },
  first_name: { element: 'input', type: 'text', placeholder: 'Имя' },
  middle_name: { element: 'input', type: 'text', placeholder: 'Фамилия' },
  date_of_birth: { element: 'input', type: 'date' },
  phone: { element: 'input', type: 'tel', placeholder: 'Телефон' },
  email: { element: 'input', type: 'email', placeholder: 'Email' },
};

const PatientsFilterPanel: React.FC<PatientsFilterPanelProps> = React.memo(({ fields }) => {
  const dispatch = useTypedDispatch();
  const setFilters = (newFields: Partial<PatientsFilterFields>) => dispatch(setPatientFilterFields(newFields));

  const queryParams = useMemo(
    () => ({
      ...fields,
      limit: 15, //TODO pagination
      offset: 0,
    }),
    [fields],
  );

  const handleSearch = (queryParams: PatientsFilterQuery = { limit: 15, offset: 0 }) => {
    dispatch(clearPatients());
    dispatch(fetchPatientsRequest(queryParams));
  };

  const handleClear = () => {
    dispatch(resetPatientFilterFields());
    handleSearch();
  };

  const { inputsRef, handleKeyDown } = useKeyboardNavigation(() => handleSearch(queryParams));

  return (
    <div className="bg-gray-900 p-4 rounded-xl mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6">
      {/* поля фильтра */}
      {Object.keys(fields).map((field, index) => {
        const config = fieldTypes[field as keyof PatientsFilterFields];

        if (config.element === 'select') {
          return (
            <select
              key={field}
              value={fields[field as keyof PatientsFilterFields]}
              ref={(el) => el && (inputsRef.current[index] = el)}
              onChange={(e) => setFilters({ [field]: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="px-3 py-2 rounded-lg bg-gray-800 text-white"
            >
              {config.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );
        }

        return (
          <input
            key={field}
            ref={(el) => el && (inputsRef.current[index] = el)}
            type={config.type}
            placeholder={config?.placeholder}
            onBeforeInput={inputTypeHandlers[config.type]}
            onKeyDown={(e) => handleKeyDown(e, index)}
            value={fields[field as keyof PatientsFilterFields]}
            onChange={(e) => setFilters({ [field]: e.target.value })}
            className="px-3 py-2 rounded-lg bg-gray-800 text-white"
          />
        );
      })}

      {/* очистить фильтр */}
      <button
        onClick={handleClear}
        className="flex items-center gap-2 px-6 py-3 bg-red-400 text-black font-semibold rounded-lg hover:bg-red-500 transition text-lg"
      >
        <BiX className="text-xl" />
        Сбросить фильтр
      </button>

      {/* поиск */}
      <button
        onClick={() => handleSearch(queryParams)}
        className="flex items-center gap-2 px-6 py-3 bg-green-400 text-black font-semibold rounded-lg hover:bg-green-500 transition text-lg"
      >
        <BiSearch className="text-xl" />
        Поиск
      </button>
    </div>
  );
});

export default PatientsFilterPanel;
