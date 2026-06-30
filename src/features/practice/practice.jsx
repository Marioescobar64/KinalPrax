import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PracticeModal } from "./PracticeModal";

const mockPractices = [
  { 
    id: 1, 
    estudiante: "65f1a2b3c4d5e6f7a8b9c011", // ID de simulación
    nombreEstudiante: "Juan Fernando Pérez", 
    empresa: "65f1a2b3c4d5e6f7a8b9c022", // ID de simulación
    nombreEmpresa: "Tech Solutions", 
    fecha: "2026-04-01", 
    horas: 40, 
    actividades: "Desarrollo de módulos frontend utilizando React y Tailwind CSS.", 
    estado: "aprobada",
    comentarios: "Excelente desempeño en sus entregables."
  },
  { 
    id: 2, 
    estudiante: "65f1a2b3c4d5e6f7a8b9c033",
    nombreEstudiante: "María Andre García", 
    empresa: "65f1a2b3c4d5e6f7a8b9c044",
    nombreEmpresa: "Constructora Moderna", 
    fecha: "2026-03-15", 
    horas: 25, 
    actividades: "Mantenimiento preventivo de equipo de cómputo y redes locales.", 
    estado: "pendiente",
    comentarios: ""
  },
];

export const Practice = () => {
  const [practices, setPractices] = useState(mockPractices);
  const [showModal, setShowModal] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);

  const handleAdd = () => {
    setSelectedPractice(null);
    setShowModal(true);
  };

  const handleEdit = (practice) => {
    setSelectedPractice(practice);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este registro de práctica?")) {
      setPractices(practices.filter(p => p.id !== id));
    }
  };

  const handleSave = (data) => {
    if (selectedPractice) {
      setPractices(practices.map(p => p.id === selectedPractice.id ? { ...data, id: selectedPractice.id } : p));
    } else {
      setPractices([...practices, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const getEstadoBadge = (estado) => {
    const styles = {
      pendiente: "bg-amber-100 text-amber-700 border-amber-200",
      aprobada: "bg-green-100 text-green-700 border-green-200",
      rechazada: "bg-red-100 text-red-700 border-red-200",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[estado] || "bg-gray-100 text-gray-700"}`}>
        {estado}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Prácticas</h1>
            <p className="text-sm text-gray-300 mt-1.5">Control de horas, actividades y aprobación de prácticas técnico-laborales</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nueva Práctica
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Estudiante</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Empresa</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Fecha</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Horas</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Actividades</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Estado</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {practices.map((practice) => (
                <tr key={practice.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800 text-base">
                    {practice.nombreEstudiante || "Estudiante Vinculado"}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-semibold">
                    {practice.nombreEmpresa || "Empresa Vinculada"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap font-medium">{practice.fecha}</td>
                  <td className="px-6 py-4 text-[#C00000] font-bold text-base">{practice.horas} hrs</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={practice.actividades}>
                    {practice.actividades}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{getEstadoBadge(practice.estado)}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(practice)} className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(practice.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PracticeModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedPractice}
        />
      </section>
    </div>
  );
};