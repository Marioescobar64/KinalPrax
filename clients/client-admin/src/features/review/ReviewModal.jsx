import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

export const ReviewModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    practica: "",
    supervisor: "",
    comentario: "",
    fecha: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        practica: "",
        supervisor: "",
        comentario: "",
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
        
        {/* CABECERA */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Modificar Evaluación" : "Registrar Nueva Evaluación"}
          </h2>
          <button 
            onClick={onClose} 
            type="button"
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 space-y-4 bg-white overflow-y-auto">
            
            {/* Campo Relacional: Practica (ObjectId) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Práctica a Evaluar</label>
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
                <option value="" disabled>-- Seleccione la práctica del estudiante --</option>
                <option value="65f1a2b3c4d5e6f7a8b9c999">Práctica Supervisada - Fase I (Juan Pérez)</option>
                <option value="65f1a2b3c4d5e6f7a8b9c888">Práctica Técnica - Backend (María García)</option>
              </select>
            </div>

            {/* Campo Relacional: Supervisor (ObjectId) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Supervisor a Cargo</label>
              <select
                required
                value={formData.supervisor}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  supervisor: e.target.value, 
                  nombreSupervisor: e.target.options[e.target.selectedIndex].text 
                })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white cursor-pointer"
              >
                <option value="" disabled>-- Identificación del Supervisor --</option>
                <option value="65f1a2b3c4d5e6f7a8b9c111">Dr. López</option>
                <option value="65f1a2b3c4d5e6f7a8b9c222">Ing. Rodríguez</option>
              </select>
            </div>

            {/* Campo: Fecha (Required) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Fecha de la Revisión</label>
              <input 
                required 
                type="date" 
                value={formData.fecha} 
                onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campo: Comentario (Required - Max 500) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Comentarios y Feedback Técnico</label>
              <textarea 
                required
                maxLength={500}
                rows={4}
                value={formData.comentario} 
                onChange={(e) => setFormData({ ...formData, comentario: e.target.value })} 
                placeholder="Escribe aquí las observaciones del desempeño o correcciones requeridas..." 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 resize-none" 
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {formData.comentario.length}/500 caracteres
              </div>
            </div>

          </div>

          {/* BOTONES DE ACCIÓN */}
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
              {initialData ? "Guardar Cambios" : "Emitir Revisión"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};