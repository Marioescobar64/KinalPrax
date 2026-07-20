import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EvidenceModal } from "./EvidenceModal";
import { useAdminStore } from "../../shared/store/adminStore";

export const Evidence = () => {
  const { evidences, getEvidences, createEvidence, updateEvidence, deleteEvidence } = useAdminStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);

  useEffect(() => {
    getEvidences();
  }, [getEvidences]);

  const handleAdd = () => {
    setSelectedEvidence(null);
    setShowModal(true);
  };

  const handleEdit = (evidence) => {
    setSelectedEvidence(evidence);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta evidencia?")) {
      try {
        await deleteEvidence(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedEvidence) {
        await updateEvidence(selectedEvidence._id, data);
      } else {
        await createEvidence(data);
      }
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Evidencias</h1>
            <p className="text-sm text-gray-300 mt-1.5">Administración de entregables, archivos cargados e historial de soporte técnico</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nueva Evidencia
          </button>
        </div>

        {/* TABLA DE CONTENIDO */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Archivo Adjunto</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Práctica Vinculada</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Descripción del Entregable</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide w-40">Fecha de Registro</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {evidences.map((evidence) => (
                <tr key={evidence._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#C00000] break-all max-w-xs">
                    <span className="underline cursor-pointer hover:text-[#A00000]">{evidence.archivo}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {evidence.practica?.nombre || "Práctica no especificada"}
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-sm">
                    {evidence.descripcion || "Sin descripción disponible"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                    {evidence.fecha ? new Date(evidence.fecha).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(evidence)} 
                        className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(evidence._id)} 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <EvidenceModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedEvidence}
        />
      </section>
    </div>
  );
};
