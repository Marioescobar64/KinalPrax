import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CompanyModal } from "./CompanyModal";
import { useAdminStore } from "../../shared/store/adminStore";

export const Company = () => {
  const { companies, getCompanies, createCompany, updateCompany, deleteCompany } = useAdminStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const handleAdd = () => {
    setSelectedCompany(null);
    setShowModal(true);
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta empresa?")) {
      try {
        await deleteCompany(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedCompany) {
        await updateCompany(selectedCompany._id, data);
      } else {
        await createCompany(data);
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
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Empresas</h1>
            <p className="text-sm text-gray-300 mt-1.5">Gestión de empresas afiliadas</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nueva Empresa
          </button>
        </div>

        {/* TABLA ADAPTABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Nombre</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Dirección</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500 tracking-wide">Encargado</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500 tracking-wide">Contacto / Correo</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Teléfono</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((company) => (
                <tr key={company._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800 text-base">{company.nombreEmpresa}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{company.direccion}</td>
                  <td className="px-6 py-4 text-gray-500">{company.encargado}</td>
                  <td className="px-6 py-4 text-gray-500 lowercase">{company.correo}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{company.telefono}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(company)} className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(company._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* COMPONENTE MODAL MODULAR */}
        <CompanyModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedCompany}
        />
      </section>
    </div>
  );
};