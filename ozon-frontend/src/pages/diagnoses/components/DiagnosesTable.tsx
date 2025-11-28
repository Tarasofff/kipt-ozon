import { DiagnoseEntity } from '@/entities/diagnose/models/type/diagnoseType';

interface DiagnoseTableProps {
  data: DiagnoseEntity[];
}

export default function DiagnosesTable({ data }: DiagnoseTableProps) {
  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow-lg pt-1.5">
        <table className="min-w-full border border-gray-700 text-sm text-left text-gray-200 bg-gray-900">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border-b border-gray-700">ID</th>
              <th className="px-4 py-3 border-b border-gray-700">Название</th>
            </tr>
          </thead>

          <tbody>
            {data.map((diagnose) => (
              <tr key={diagnose.id} className="hover:bg-gray-800 transition-colors even:bg-gray-900 odd:bg-gray-950">
                <td className="px-4 py-3 border-b border-gray-700">{diagnose.id}</td>
                <td className="px-4 py-3 border-b border-gray-700">{diagnose.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
