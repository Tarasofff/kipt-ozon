import { getPatientById } from '@/entities/patient/api/requests';
import { PatientEntity } from '@/entities/patient/models/type/patientType';
import { useEffect, useState } from 'react';
import { PatientInfoModalWindow } from '.';
import React from 'react';
import { Formatter } from '@/shared/type/formatterType';

interface PatientsTableProps {
  data: PatientEntity[];
}

type PatientTableEntity = Omit<PatientEntity, 'patient_doctor_diagnose' | 'notes' | 'created_at' | 'updated_at'>;

type TableColumns = Record<keyof PatientTableEntity, string>;

const tableColumns: TableColumns = {
  id: 'ID',
  first_name: 'Имя',
  middle_name: 'Фамилия',
  last_name: 'Отчество',
  phone: 'Телефон',
  date_of_birth: 'Дата рождения',
  email: 'Email',
  is_active: 'Активен',
};

const PatientsTable = ({ data }: PatientsTableProps) => {
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<PatientEntity | null>(null);
  const [loadingPatient, setLoadingPatient] = useState(false);

  // загружаем выбранного пациента по id
  useEffect(() => {
    if (!selectedPatientId) {
      setSelectedPatient(null);
      return;
    }

    let cancelled = false;
    setLoadingPatient(true);

    (async () => {
      try {
        const patient = await getPatientById(selectedPatientId);
        if (!cancelled) {
          setSelectedPatient(patient);
        }
      } catch (err) {
        if (!cancelled) {
          //TODO
          console.log('Ошибка загрузки пациента:', err);
        }
      } finally {
        if (!cancelled) {
          setLoadingPatient(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedPatientId]);

  const cellFormatters: Partial<{
    [K in keyof TableColumns]: Formatter<PatientTableEntity[K]>;
  }> = {
    email: (value: string | null) => value || <span className="text-gray-500 italic">-</span>,

    is_active: (value: boolean) => {
      const colors = value
        ? { bg: 'bg-green-600/30', text: 'text-green-400', label: 'Активен' }
        : { bg: 'bg-red-600/30', text: 'text-red-400', label: 'Неактивен' };

      return <span className={`px-2 py-1 rounded-full text-xs ${colors.bg} ${colors.text}`}>{colors.label}</span>;
    },

    date_of_birth: (value: string | Date) => {
      const date = value instanceof Date ? value : new Date(value);
      return date.toLocaleDateString();
    },
  };

  const renderCell = <K extends keyof TableColumns>(key: K, value: PatientTableEntity[K]): React.ReactNode => {
    const formatter = cellFormatters[key];
    if (formatter) return formatter(value);
    return value ?? '';
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow-lg pt-1.5">
        <table className="min-w-full border border-gray-700 text-sm text-left text-gray-200 bg-gray-900">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs font-semibold">
            <tr>
              {Object.entries(tableColumns).map(([key, label]) => (
                <th key={key} className="px-4 py-3 border-b border-gray-700">
                  {label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
                className="hover:bg-gray-800 transition-colors even:bg-gray-900 odd:bg-gray-950"
              >
                {(Object.keys(tableColumns) as Array<keyof typeof tableColumns>).map((key) => (
                  <td key={key} className="px-4 py-3 border-b border-gray-700">
                    {renderCell(key, patient[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PatientInfoModalWindow
        patient={loadingPatient ? null : selectedPatient}
        onClose={() => {
          setSelectedPatientId(null); //TODO cb
          setSelectedPatient(null);
        }}
      />
    </>
  );
};

export default React.memo(PatientsTable);
