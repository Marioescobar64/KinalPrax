import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "../../shared/store/adminStore";

export const SupervisorModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { companies, getCompanies } = useAdminStore();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    empresa: ""
  });

  useEffect(() => {
    if (isOpen) {
      getCompanies();
    }
  }, [isOpen, getCompanies]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        correo: initialData.correo || "",
        telefono: initialData.telefono || "",
        empresa: typeof initialData.empresa === "object" ? initialData.empresa?._id : (initialData.empresa || "")
      });
    } else {
      setFormData({
        nombre: "",
        correo: "",
        telefono: "",
        empresa: ""
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2C1506]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden max-h-[95vh] border border-gray-100">
        
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Modificar Supervisor" : "Registrar Nuevo Supervisor"}
          </h2>
          <button 
            onClick={onClose} 
            type="button"
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 space-y-4 bg-white">
            
            {/* Campo: Nombre Completo (Max 255) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Nombre Completo</label>
              <input 
                required 
                maxLength={255}
                type="text" 
                value={formData.nombre} 
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                placeholder="Ej. Ing. Carlos López" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campo: Correo Electrónico (Max 255) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Correo Electrónico</label>
              <input 
                required 
                maxLength={255}
                type="email" 
                value={formData.correo} 
                onChange={(e) => setFormData({ ...formData, correo: e.target.value.toLowerCase() })} 
                placeholder="ejemplo@empresa.com" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campo: Teléfono (Max 20 - Opcional) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Teléfono de Contacto</label>
              <input 
                maxLength={20}
                type="text" 
                value={formData.telefono} 
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} 
                placeholder="Ej. +502 2541-2345" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campo: Empresa Relacionada (Mongoose ObjectId) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Empresa / Institución</label>
              <select
                required
                value={formData.empresa}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  empresa: e.target.value
                })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white cursor-pointer"
              >
                <option value="" disabled>-- Seleccione la empresa de origen --</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.nombreEmpresa}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Footer de Acciones */}
          <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex gap-3 justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex items-center gap-1.5 bg-[#C00000] text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#A00000] shadow-md transition"
            >
              <CheckIcon className="w-4 h-4 stroke-[2.5]" /> 
              {initialData ? "Actualizar Contacto" : "Guardar Contacto"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};