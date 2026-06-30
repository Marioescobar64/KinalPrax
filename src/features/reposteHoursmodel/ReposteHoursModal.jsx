import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const ReposteHoursModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    estudiante: "",
    horasTotales: "",
    horasAprobadas: "",
    horasPendientes: ""
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        estudiante: "",
        horasTotales: 150, // Común estándar de horas de práctica
        horasAprobadas: 0,
        horasPendientes: 150
      });
    }
    setError("");
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const totales = Number(formData.horasTotales);
    const aprobadas = Number(formData.horasAprobadas);
    const pendientes = Number(formData.horasPendientes);

    // VALIDACIÓN PROFESIONAL: El desglose no debe contradecir el total
    if (aprobadas + pendientes > totales) {
      setError("La suma de horas aprobadas y pendientes excede el límite de horas totales configuradas.");
      return;
    }

    setError("");
    onSave({
      ...formData,
      horasTotales: totales,
      horasAprobadas: aprobadas,
      horasPendientes: pendientes
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2C1506]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden max-h-[95vh] border border-gray-100">
        
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Modificar Progreso de Horas" : "Inicializar Registro de Horas"}
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
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
            
            {/* Mensaje de Validaciones de Negocio */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-sm font-medium">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Inconsistencia numérica:</span> {error}
                </div>
              </div>
            )}

            {/* Campo: Estudiante (Mongoose ObjectId) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Estudiante Vinculado</label>
              <select
                required
                disabled={!!initialData} // Bloqueado en edición para no reasignar el progreso de un alumno a otro
                value={formData.estudiante}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  estudiante: e.target.value, 
                  nombreEstudiante: e.target.options[e.target.selectedIndex].text 
                })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                <option value="" disabled>-- Seleccione el estudiante --</option>
                <option value="65f1a2b3c4d5e6f7a8b9c011">Juan Pérez</option>
                <option value="65f1a2b3c4d5e6f7a8b9c033">María García</option>
              </select>
            </div>

            {/* Campo: Horas Totales */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Horas Totales Obligatorias</label>
              <input 
                required 
                min="0"
                type="number" 
                value={formData.horasTotales} 
                onChange={(e) => setFormData({ ...formData, horasTotales: e.target.value })} 
                placeholder="Ej. 150" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campos Paralelos: Aprobadas y Pendientes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-green-700 uppercase tracking-wide">Horas Aprobadas</label>
                <input 
                  required 
                  min="0"
                  type="number" 
                  value={formData.horasAprobadas} 
                  onChange={(e) => setFormData({ ...formData, horasAprobadas: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-green-200 bg-green-50/10 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-green-500 outline-none transition text-sm text-gray-800 font-bold text-green-600" 
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-amber-700 uppercase tracking-wide">Horas Pendientes</label>
                <input 
                  required 
                  min="0"
                  type="number" 
                  value={formData.horasPendientes} 
                  onChange={(e) => setFormData({ ...formData, horasPendientes: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-amber-200 bg-amber-50/10 rounded-xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 outline-none transition text-sm text-gray-800 font-semibold text-amber-600" 
                />
              </div>
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
              {initialData ? "Actualizar Métricas" : "Inicializar Progreso"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};