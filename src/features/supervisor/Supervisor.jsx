import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { SupervisorModal } from "./SupervisorModal";

const mockSupervisors = [
  { 
    id: 1, 
    nombre: "Ing. Carlos López", 
    correo: "lopez@techsolutions.com", 
    telefono: "+502 2541-2345",
    empresa: "65f1a2b3c4d5e6f7a8b9c022",
    nombreEmpresa: "Tech Solutions"
  },
  { 
    id: 2, 
    nombre: "Licda. Marta Rodríguez", 
    correo: "marta.rodriguez@constructora.com", 
    telefono: "+502 7894-5612",
    empresa: "65f1a2b3c4d5e6f7a8b9c044",
    nombreEmpresa: "Constructora Moderna"
  },
];

export const Supervisor = () => {
  const [supervisors, setSupervisors] = useState(mockSupervisors);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);

  const handleAdd = () => {
    setSelectedSupervisor(null);
    setShowModal(true);
  };

  const handleEdit = (supervisor) => {
    setSelectedSupervisor(supervisor);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar a este supervisor?")) {
      setSupervisors(supervisors.filter(s => s.id !== id));
    }
  };

  const handleSave = (data) => {
    if (selectedSupervisor) {
      setSupervisors(supervisors.map(s => s.id === selectedSupervisor.id ? { ...data, id: selectedSupervisor.id } : s));
    } else {
      setSupervisors([...supervisors, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Supervisores</h1>
            <p className="text-sm text-gray-300 mt-1.5">Administración de contactos y enlaces institucionales de las empresas</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nuevo Supervisor
          </button>
        </div>

        {/* TABLA DE CONTENIDO */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Nombre Completo</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Empresa Asignada</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Correo Electrónico</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Teléfono de Contacto</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {supervisors.map((supervisor) => (
                <tr key={supervisor.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800 text-base">
                    {supervisor.nombre}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold text-xs border border-blue-100">
                      {supervisor.nombreEmpresa || "Empresa Externa"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600 select-all">{supervisor.correo}</td>
                  <td className="px-6 py-4 font-medium text-gray-600">{supervisor.telefono || "N/A"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(supervisor)} 
                        className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(supervisor.id)} 
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

        <SupervisorModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedSupervisor}
        />
      </section>
    </div>
  );
};