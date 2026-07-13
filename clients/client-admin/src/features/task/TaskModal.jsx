import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "../../shared/store/adminStore";

export const TaskModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { students, getStudents, supervisors, getSupervisors } = useAdminStore();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
    estado: "pendiente",
    estudiante: "",
    supervisor: ""
  });

  useEffect(() => {
    if (isOpen) {
      getStudents();
      getSupervisors();
    }
  }, [isOpen, getStudents, getSupervisors]);

  useEffect(() => {
    if (initialData) {
      const fechaIni = initialData.fechaInicio ? initialData.fechaInicio.split("T")[0] : "";
      const fechaF = initialData.fechaFin ? initialData.fechaFin.split("T")[0] : "";
      setFormData({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        fechaInicio: fechaIni,
        fechaFin: fechaF,
        estado: initialData.estado || "pendiente",
        estudiante: typeof initialData.estudiante === "object" ? initialData.estudiante?._id : (initialData.estudiante || ""),
        supervisor: typeof initialData.supervisor === "object" ? initialData.supervisor?._id : (initialData.supervisor || "")
      });
    } else {
      setFormData({
        titulo: "",
        descripcion: "",
        fechaInicio: new Date().toISOString().split('T')[0],
        fechaFin: "",
        estado: "pendiente",
        estudiante: "",
        supervisor: ""
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
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden max-h-[95vh] border border-gray-100">
        
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Modificar Tarea de Práctica" : "Registrar Nueva Tarea"}
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
            
            {/* Campo: Título (Required - Max 255) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Título de la Tarea</label>
              <input 
                required 
                maxLength={255}
                type="text" 
                value={formData.titulo} 
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} 
                placeholder="Ej. Desarrollar módulos de reportería" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Campo: Descripción (Max 1000) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Descripción Detallada</label>
              <textarea 
                maxLength={1000}
                rows={3}
                value={formData.descripcion} 
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} 
                placeholder="Especifica los lineamientos, tecnologías o requerimientos clave..." 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 resize-none" 
              />
            </div>

            {/* Fila: Fecha de Inicio y Fin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Fecha de Inicio</label>
                <input 
                  required 
                  type="date" 
                  value={formData.fechaInicio} 
                  onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Fecha Fin (Opcional)</label>
                <input 
                  type="date" 
                  value={formData.fechaFin} 
                  onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })} 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
                />
              </div>
            </div>

            {/* Campo: Estado (Enum) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Estado de Ejecución</label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white cursor-pointer"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En Progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>

            {/* Campo Relacional: Estudiante (Required Mongoose ObjectId) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Estudiante Asignado</label>
              <select
                required
                value={formData.estudiante}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  estudiante: e.target.value
                })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white cursor-pointer"
              >
                <option value="" disabled>-- Seleccione al Estudiante Practicante --</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.nombre} ({s.carnet})
                  </option>
                ))}
              </select>
            </div>

            {/* Campo Relacional: Supervisor (Required Mongoose ObjectId) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Supervisor Responsable</label>
              <select
                required
                value={formData.supervisor}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  supervisor: e.target.value
                })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white cursor-pointer"
              >
                <option value="" disabled>-- Seleccione al Contacto de la Empresa --</option>
                {supervisors.map((sup) => (
                  <option key={sup._id} value={sup._id}>
                    {sup.nombre}
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
              {initialData ? "Actualizar Tarea" : "Guardar Tarea"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};