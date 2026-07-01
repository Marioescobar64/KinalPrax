import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ReposteHoursModal } from "./ReposteHoursModal.jsx";
import { useAdminStore } from "../../shared/store/adminStore";

export const ReposteHours = () => {
  const { progressRecords, getProgressRecords, createProgressRecord, updateProgressRecord, deleteProgressRecord } = useAdminStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState(null);

  useEffect(() => {
    getProgressRecords();
  }, [getProgressRecords]);

  const handleAdd = () => {
    setSelectedProgress(null);
    setShowModal(true);
  };

  const handleEdit = (progress) => {
    setSelectedProgress(progress);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Está seguro de que desea eliminar el registro de progreso de este estudiante?")) {
      try {
        await deleteProgressRecord(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSave = async (data) => {
    try {
      const payload = {
        estudiante: data.estudiante,
        horasTotales: Number(data.horasTotales),
        horasAprobadas: Number(data.horasAprobadas),
        horasPendientes: Number(data.horasPendientes)
      };

      if (selectedProgress) {
        await updateProgressRecord(selectedProgress._id, payload);
      } else {
        await createProgressRecord(payload);
      }
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  // Cálculos globales para las tarjetas informativas superiores
  const globalTotales = progressRecords.reduce((sum, p) => sum + (p.horasTotales || 0), 0);
  const globalAprobadas = progressRecords.reduce((sum, p) => sum + (p.horasAprobadas || 0), 0);
  const globalPendientes = progressRecords.reduce((sum, p) => sum + (p.horasPendientes || 0), 0);

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Reporte de Horas</h1>
            <p className="text-sm text-gray-300 mt-1.5">Monitoreo y control del acumulado global de horas de práctica</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nuevo Registro
          </button>
        </div>

        {/* TARJETAS DE MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
              <ClockIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Asignadas Globales</p>
              <p className="text-2xl font-black text-white mt-0.5">{globalTotales} hrs</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-500/10 text-green-400">
              <ClockIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Aprobadas Globales</p>
              <p className="text-2xl font-black text-green-400 mt-0.5">{globalAprobadas} hrs</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
              <ClockIcon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pendientes Globales</p>
              <p className="text-2xl font-black text-amber-400 mt-0.5">{globalPendientes} hrs</p>
            </div>
          </div>
        </div>

        {/* TABLA DE CONTENIDO */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Estudiante</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Horas Totales Requeridas</th>
                <th className="px-6 py-4 text-left font-bold text-green-700 tracking-wide">Horas Aprobadas</th>
                <th className="px-6 py-4 text-left font-bold text-amber-700 tracking-wide">Horas Pendientes</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Progreso Visual</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {progressRecords.map((progress) => {
                const porcentaje = Math.min(Math.round((progress.horasAprobadas / progress.horasTotales) * 100), 100) || 0;
                return (
                  <tr key={progress._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800 text-base">
                      {progress.estudiante?.nombre || progress.nombreEstudiante || "Estudiante Vinculado"}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-600">{progress.horasTotales} hrs</td>
                    <td className="px-6 py-4 font-bold text-green-600 text-base">{progress.horasAprobadas} hrs</td>
                    <td className="px-6 py-4 font-semibold text-amber-600">{progress.horasPendientes} hrs</td>
                    <td className="px-6 py-4 min-w-[150px]">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-green-500 h-full transition-all duration-500" style={{ width: `${porcentaje}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{porcentaje}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(progress)} className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(progress._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <ReposteHoursModal
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedProgress}
        />
      </section>
    </div>
  );
};