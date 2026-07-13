import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

export const InstitutionModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ nombre: "", direccion: "", telefono: "" });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      
      {/* VENTANA MEDIANA ADAPTABLE COMPACTA (max-w-xl) */}
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh] border border-gray-100">
        
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Editar Institución" : "Registrar Nueva Institución"}
          </h2>
          <button 
            onClick={onClose} 
            type="button"
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Formulario vinculado al Backend Schema */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
            
            {/* Nombre de la Institución */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Nombre de la Institución</label>
              <input 
                required 
                maxLength={255}
                type="text" 
                value={formData.nombre} 
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                placeholder="Ej. Universidad de San Carlos" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Dirección */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Dirección</label>
              <input 
                required 
                maxLength={255}
                type="text" 
                value={formData.direccion} 
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} 
                placeholder="Ej. Ciudad Universitaria, Zona 12" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Teléfono de Contacto</label>
              <input 
                maxLength={20}
                type="tel" 
                value={formData.telefono} 
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} 
                placeholder="Ej. 2200-1122" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
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
              {initialData ? "Guardar" : "Crear Institución"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};