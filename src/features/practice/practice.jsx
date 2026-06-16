import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { PracticeModal } from "./PracticeModal"; // Asegúrate de importar el modal

const mockPractices = [
  { id: 1, title: "Práctica en Desarrollo Web", company: "Tech Solutions", startDate: "2026-04-01", endDate: "2026-06-30", status: "En Curso", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=150&q=80" },
  { id: 2, title: "Práctica en Sistemas", company: "Constructora Moderna", startDate: "2026-03-15", endDate: "2026-05-15", status: "Completada", image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=150&q=80" },
];

export const Practice = () => {
  const [practices, setPractices] = useState(mockPractices);
  const [showModal, setShowModal] = useState(false);
  const [selectedPractice, setSelectedPractice] = useState(null);

  const handleAdd = () => {
    setSelectedPractice(null); // Limpiar para nueva práctica
    setShowModal(true);
  };

  const handleEdit = (practice) => {
    setSelectedPractice(practice); // Cargar datos de la práctica a editar
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta práctica?")) {
      setPractices(practices.filter(p => p.id !== id));
    }
  };

  const handleSave = (data) => {
    if (selectedPractice) {
      // Editar
      setPractices(practices.map(p => p.id === selectedPractice.id ? { ...data, id: selectedPractice.id } : p));
    } else {
      // Agregar nuevo
      setPractices([...practices, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C1506]">Prácticas</h1>
          <p className="text-sm text-[#2C1506]/80 mt-1">Gestión de prácticas profesionales</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-[#C00000] text-white px-5 py-2.5 rounded-xl font-medium shadow-md hover:bg-[#A00000] transition-all"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Práctica
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#FFF8F0] border-b border-[#C00000]/10">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-[#e04949] w-24">Imagen</th>
              <th className="px-6 py-4 text-left font-semibold text-[#2C1506]">Título</th>
              <th className="px-6 py-4 text-left font-semibold text-[#2C1506]">Empresa</th>
              <th className="px-6 py-4 text-left font-semibold text-[#2C1506]">Inicio</th>
              <th className="px-6 py-4 text-left font-semibold text-[#2C1506]">Fin</th>
              <th className="px-6 py-4 text-left font-semibold text-[#2C1506]">Estado</th>
              <th className="px-6 py-4 text-center font-semibold text-[#2C1506] w-32">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {practices.map((practice) => (
              <tr key={practice.id} className="hover:bg-[#FFF8F0]/30 transition-colors">
                <td className="px-6 py-4">
                  {practice.image ? (
                    <img src={practice.image} alt="" className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
                      <PhotoIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-[#2C1506] font-semibold">{practice.title}</td>
                <td className="px-6 py-4 text-[#2C1506]/80 font-medium">{practice.company}</td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{practice.startDate}</td>
                <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{practice.endDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-block ${
                    practice.status === "En Curso" ? "bg-blue-50 text-blue-700 border border-blue-100" : 
                    practice.status === "Completada" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                  }`}>
                    {practice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-1.5">
                    <button onClick={() => handleEdit(practice)} className="p-2 text-gray-500 hover:text-[#C00000] hover:bg-[#C00000]/5 rounded-xl transition-all">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(practice.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Renderizado del Modal */}
      <PracticeModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSave={handleSave}
        initialData={selectedPractice}
      />
    </section>
  );
};