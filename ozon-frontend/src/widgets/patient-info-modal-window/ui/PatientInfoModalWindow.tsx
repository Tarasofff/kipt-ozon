import { useTypedSelector } from '@/app/store';
import { processingReport } from '@/services/report/report';
import { useState } from 'react';

interface Address {
  id: number;
  city_name: string;
  street_name: string;
  postal_code: string;
  building_number: string;
  country_name: string;
  created_at: string;
  updated_at: string;
}

interface Hospital {
  id: number;
  name: string;
  number: number;
  address: Address;
}

interface Cabinet {
  id: number;
  number: string;
  hospital: Hospital;
}

interface Post {
  id: number;
  number: number;
  cabinet: Cabinet;
}

interface Session {
  id: number;
  notes: string | null;
  is_active: boolean;
  session_duration_ms: number;
  ozone_concentration: number;
  post: Post;
}

interface Diagnose {
  id: number;
  name: string;
}

interface User {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Doctor {
  id: number;
  user: User;
}

interface PatientDoctorDiagnose {
  id: number;
  diagnose: Diagnose;
  session: Session[];
  doctor: Doctor;
}

export interface PatientWithRelations {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  date_of_birth: string;
  is_active: boolean;
  planned_session_count: number;
  created_at: string;
  updated_at: string;
  patient_doctor_diagnose: PatientDoctorDiagnose[];
}

interface PatientInfoModalWindowProps {
  patient: PatientWithRelations | null;
  onClose: () => void;
}

export default function PatientInfoModalWindow({ patient, onClose }: PatientInfoModalWindowProps) {
  const { token, tokenType } = useTypedSelector((s) => s.auth);
  const [openDiagnose, setOpenDiagnose] = useState<number | null>(null);

  // хранит выбранную больницу для каждого patient_doctor_diagnose (ключ = pdd.id)
  const [selectedHospitals, setSelectedHospitals] = useState<Record<number, number | undefined>>({});
  const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});

  if (!patient) return null;
  if (!token || !tokenType) throw new Error('Not authorized');

  // собрать уникальные больницы из сессий (без дублирования по id)
  const getUniqueHospitals = (pdd: NonNullable<PatientWithRelations['patient_doctor_diagnose']>[number]) => {
    const hospitals =
      pdd?.session
        ?.map((session) => session?.post?.cabinet?.hospital)
        .filter((hospital): hospital is Hospital => !!hospital && typeof hospital.id === 'number') ?? [];
    const map = new Map<number, { id: number; name: string }>();
    for (const hospital of hospitals) {
      if (!map.has(hospital.id)) map.set(hospital.id, hospital);
    }
    return Array.from(map.values());
  };

  const handleSelectHospital = (pddId: number, hospitalId: number | undefined) => {
    setSelectedHospitals((prev) => ({ ...prev, [pddId]: hospitalId }));
  };

  const handleReport = async (
    patientId: number,
    hospitalId: number | null | undefined,
    pddId: number,
    download = false,
  ) => {
    if (!hospitalId) return;
    setLoadingMap((prev) => ({ ...prev, [pddId]: true }));
    try {
      await processingReport(token, tokenType, patientId, hospitalId, pddId, download);
    } catch (err) {
      console.error('Ошибка при генерации отчёта:', err);
      alert('Ошибка при генерации отчёта');
    } finally {
      setLoadingMap((prev) => ({ ...prev, [pddId]: false }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-gray-900 text-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Пациент #{patient.id}: {patient.last_name} {patient.first_name} {patient.middle_name || ''}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <p>
            <strong>Телефон:</strong> {patient.phone || <span className="text-gray-400">не указан</span>}
          </p>
          <p>
            <strong>Email:</strong> {patient.email ?? <span className="text-gray-500 italic">нет</span>}
          </p>
          <p>
            <strong>Дата рождения:</strong>{' '}
            {patient.date_of_birth ? new Date(patient.date_of_birth).toLocaleDateString('ru-RU') : 'неизвестно'}
          </p>
          <p>
            <strong>Активен:</strong> {patient.is_active ? 'Да' : 'Нет'}
          </p>
        </div>

        {/* Диагнозы */}
        <div className="space-y-4">
          {patient.patient_doctor_diagnose && patient.patient_doctor_diagnose.length > 0 ? (
            patient.patient_doctor_diagnose.map((pdd) => {
              const hospitals = getUniqueHospitals(pdd);
              // выбранная в стейте больница (если есть)
              const selectedHospitalFromState = selectedHospitals[pdd.id];
              // если больниц ровно одна и пользователь ничего не выбирал — используем её
              const derivedSelectedHospital =
                selectedHospitalFromState ?? (hospitals.length === 1 ? hospitals[0].id : undefined);

              return (
                <div key={pdd.id} className="border border-gray-700 rounded-lg">
                  <button
                    className="w-full text-left px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex justify-between items-center"
                    onClick={() => setOpenDiagnose(openDiagnose === pdd.id ? null : pdd.id)}
                  >
                    <span className="font-semibold">Диагноз: {pdd.diagnose?.name || 'не указан'}</span>
                    <span>{openDiagnose === pdd.id ? '▲' : '▼'}</span>
                  </button>

                  {openDiagnose === pdd.id && (
                    <div className="p-4 space-y-3">
                      {pdd.doctor?.user ? (
                        <div className="mb-3">
                          <strong>Лечащий врач:</strong>{' '}
                          {`${pdd.doctor.user.last_name ?? ''} ${pdd.doctor.user.first_name ?? ''} ${
                            pdd.doctor.user.middle_name ?? ''
                          }`}
                          {pdd.doctor.user.email ? (
                            <>
                              {' '}
                              (
                              <a href={`mailto:${pdd.doctor.user.email}`} className="text-blue-400">
                                {pdd.doctor.user.email}
                              </a>
                              , {pdd.doctor.user.phone || 'телефон не указан'})
                            </>
                          ) : (
                            <> ({pdd.doctor.user.phone || 'телефон не указан'})</>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400">Лечащий врач не указан</p>
                      )}

                      {/* Сессии */}
                      <div>
                        <h4 className="font-semibold mb-2">Сессии:</h4>
                        {pdd.session && pdd.session.length > 0 ? (
                          <div className="space-y-2">
                            {pdd.session.map((session) => (
                              <div key={session.id} className="border border-gray-700 rounded-lg p-3 bg-gray-800">
                                <p>
                                  <strong>ID:</strong> {session.id}
                                </p>
                                <p>
                                  <strong>Активна:</strong> {session.is_active ? 'Да' : 'Нет'}
                                </p>
                                <p>
                                  <strong>Длительность:</strong> {Math.round((session.session_duration_ms ?? 0) / 1000)}{' '}
                                  сек
                                </p>
                                <p>
                                  <strong>Концентрация озона mg/l:</strong> {session.ozone_concentration ?? '—'}
                                </p>

                                {session.post?.cabinet?.hospital ? (
                                  <div className="mt-2 text-sm text-gray-300">
                                    <p>
                                      <strong>Пост №:</strong> {session.post.number ?? '—'}
                                    </p>
                                    <p>
                                      <strong>Кабинет:</strong> {session.post.cabinet.number ?? '—'}
                                    </p>
                                    <p>
                                      <strong>Больница:</strong> {session.post.cabinet.hospital.name ?? '—'}
                                    </p>
                                    <p>
                                      <strong>Адрес:</strong>{' '}
                                      {`${session.post.cabinet.hospital.address?.city_name ?? ''}, ${
                                        session.post.cabinet.hospital.address?.street_name ?? ''
                                      } ${session.post.cabinet.hospital.address?.building_number ?? ''}`}
                                    </p>
                                  </div>
                                ) : (
                                  <p className="text-gray-400 text-sm mt-2">Данные о месте проведения отсутствуют</p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-400 italic">Нет сессий</p>
                        )}
                      </div>

                      {/* Выбор больницы */}
                      <div className="mt-3">
                        {hospitals.length > 1 ? (
                          <div className="flex items-center gap-3">
                            <label className="text-sm">Выберите больницу:</label>
                            <select
                              value={selectedHospitalFromState ?? ''}
                              onChange={(e) =>
                                handleSelectHospital(pdd.id, e.target.value ? Number(e.target.value) : undefined)
                              }
                              className="bg-gray-800 text-white rounded px-2 py-1"
                            >
                              <option value="">Выбрать...</option>
                              {hospitals.map((h) => (
                                <option key={h.id} value={h.id}>
                                  {h.name}
                                </option>
                              ))}
                            </select>
                            <span className="text-sm text-gray-400"> (отчёт формируется по выбранной больнице)</span>
                          </div>
                        ) : hospitals.length === 1 ? (
                          <p></p>
                        ) : (
                          <p className="text-sm text-gray-400">Нет данных о больнице</p>
                        )}
                      </div>

                      {/* Кнопки отчетов */}
                      <div className="flex justify-end space-x-4 mt-4">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!derivedSelectedHospital || !!loadingMap[pdd.id]}
                          onClick={() => handleReport(patient.id, derivedSelectedHospital, pdd.id, false)}
                        >
                          {loadingMap[pdd.id] ? 'Загрузка...' : 'Просмотр отчета'}
                        </button>

                        <button
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!derivedSelectedHospital || !!loadingMap[pdd.id]}
                          onClick={() => handleReport(patient.id, derivedSelectedHospital, pdd.id, true)}
                        >
                          {loadingMap[pdd.id] ? 'Загрузка...' : 'Скачать отчет'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">Диагнозы отсутствуют</p>
          )}
        </div>
      </div>
    </div>
  );
}
