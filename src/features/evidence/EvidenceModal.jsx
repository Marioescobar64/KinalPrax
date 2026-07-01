import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

export const EvidenceModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    practica: "",
    archivo: "",
    descripcion: "",
    fecha: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        practica: "",
        archivo: "",
        descripcion: "",
        fecha: ""
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
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden max-h-[90vh] border border-gray-100">
        
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Modificar Evidencia" : "Subir Nueva Evidencia"}
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
          <div className="flex-1 p-6 space-y-4 bg-white overflow-y-auto">
            
            {/* Campo Relacional: Practica (Required Mongoose ObjectId) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Práctica Asociada</label>
              <select
                required
                value={formData.practica}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  practica: e.target.value, 
                  nombrePractica: e.target.options[e.target.selectedIndex].text 
                })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white cursor-pointer"
              >
                <option value="" disabled>-- Seleccione el proceso de práctica --</option>
                <option value="65f1a2b3c4d5e6f7a8b9c999">Práctica Supervisada - Fase I</option>
                <option value="65f1a2b3c4d5e6f7a8b9c888">Práctica Técnica - Backend</option>
              </select>
            </div>

            {/* Campo: Nombre del Archivo o URL (Required - Max 255) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Ruta o Nombre del Archivo</label>
              <input 
                required 
                maxLength={255}
                type="text" 
                value={formData.archivo} 
                onChange={(e) => setFormData({ ...formData, archivo: e.target.value })} 
                placeholder="Ej. documento_final_v2.pdf" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campo: Fecha (Required) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Fecha de Envío / Emisión</label>
              <input 
                required 
                type="date" 
                value={formData.fecha} 
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campo: Descripción (Max 500) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Descripción Corta</label>
              <textarea 
                maxLength={500}
                rows={4}
                value={formData.descripcion} 
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} 
                placeholder="¿Qué contiene esta evidencia documental?" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 resize-none" 
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
              {initialData ? "Actualizar Registro" : "Registrar Evidencia"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};