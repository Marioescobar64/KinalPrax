import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useAdminStore } from "../../shared/store/adminStore";

export const PracticeModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { students, getStudents, companies, getCompanies } = useAdminStore();
  const [formData, setFormData] = useState({
    estudiante: "",
    empresa: "",
    fecha: "",
    horas: "",
    actividades: "",
    estado: "pendiente",
    comentarios: ""
  });

  useEffect(() => {
    if (isOpen) {
      getStudents();
      getCompanies();
    }
  }, [isOpen, getStudents, getCompanies]);

  // Sincronizar el estado con los datos del backend o limpiar para un nuevo registro
  useEffect(() => {
    if (initialData) {
      const fechaFormateada = initialData.fecha ? initialData.fecha.split('T')[0] : "";
      setFormData({
        estudiante: typeof initialData.estudiante === "object" ? initialData.estudiante?._id : (initialData.estudiante || ""),
        empresa: typeof initialData.empresa === "object" ? initialData.empresa?._id : (initialData.empresa || ""),
        fecha: fechaFormateada,
        horas: initialData.horas || "",
        actividades: initialData.actividades || "",
        estado: initialData.estado || "pendiente",
        comentarios: initialData.comentarios || ""
      });
    } else {
      setFormData({
        estudiante: "",
        empresa: "",
        fecha: new Date().toISOString().split('T')[0], // Coloca la fecha de hoy por defecto
        horas: "",
        actividades: "",
        estado: "pendiente",
        comentarios: ""
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      horas: Number(formData.horas)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2C1506]/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 md:p-10">
      
      {/* Contenedor adaptado: se quitó el fondo negro por uno blanco profesional y alturas manejables */}
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Cabecera */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-[#FFF8F0]/40">
          <h2 className="text-2xl font-extrabold text-[#2C1506] tracking-tight">
            {initialData ? "Modificar Reporte de Práctica" : "Registrar Horas de Práctica"}
          </h2>
          <button 
            onClick={onClose} 
            type="button"
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          
          {/* Cuerpo con Scroll Interno */}
          <div className="flex-1 p-8 overflow-y-auto space-y-6 bg-white">
            
            {/* Campo: Estudiante (Se asocia al ObjectId de la ref 'Student') */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                Estudiante en Práctica
              </label>
              <select
                required
                value={formData.estudiante}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  estudiante: e.target.value
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm cursor-pointer"
              >
                <option value="" disabled>-- Seleccione un estudiante de la lista --</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.nombre} ({s.carnet})
                  </option>
                ))}
              </select>
            </div>

            {/* Campo: Empresa (Se asocia al ObjectId de la ref 'Company') */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                Empresa / Institución Asignada
              </label>
              <select
                required
                value={formData.empresa}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  empresa: e.target.value
                })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm cursor-pointer"
              >
                <option value="" disabled>-- Seleccione la empresa de destino --</option>
                {companies.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.nombreEmpresa}
                  </option>
                ))}
              </select>
            </div>

            {/* Grid Combinado: Fecha y Horas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Campo: Fecha */}
              <div className="space-y-1.5">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                  Fecha del Reporte
                </label>
                <input 
                  required 
                  type="date" 
                  value={formData.fecha} 
                  onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm" 
                />
              </div>

              {/* Campo: Horas */}
              <div className="space-y-1.5">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                  Horas Laboradas
                </label>
                <input 
                  required 
                  min="0"
                  type="number" 
                  value={formData.horas} 
                  onChange={(e) => setFormData({ ...formData, horas: e.target.value })} 
                  placeholder="Ej. 8" 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm" 
                />
              </div>
            </div>

            {/* Campo: Actividades (Con límite de 500 caracteres del backend) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                Actividades Desarrolladas
              </label>
              <textarea 
                required
                maxLength={500}
                rows={3}
                value={formData.actividades} 
                onChange={(e) => setFormData({ ...formData, actividades: e.target.value })} 
                placeholder="Describa brevemente las tareas técnicas realizadas (Máx. 500 caracteres)..." 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm resize-none" 
              />
            </div>

            {/* Campo: Estado (Enum exacto del backend) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                Estado de Aprobación
              </label>
              <select 
                value={formData.estado} 
                onChange={(e) => setFormData({ ...formData, estado: e.target.value })} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm cursor-pointer"
              >
                <option value="pendiente">⏳ Pendiente</option>
                <option value="aprobada">✅ Aprobada</option>
                <option value="rechazada">❌ Rechazada</option>
              </select>
            </div>

            {/* Campo: Comentarios (Opcional, Máx. 500 caracteres) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold uppercase tracking-wider text-gray-700">
                Comentarios y Observaciones
              </label>
              <textarea 
                maxLength={500}
                rows={2}
                value={formData.comentarios} 
                onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })} 
                placeholder="Anotaciones añadidas por supervisores o coordinadores si aplica..." 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-gray-50/50 shadow-sm resize-none" 
              />
            </div>

          </div>

          {/* Footer de Botones */}
          <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex gap-4 justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#A00000] shadow-md transition-all transform hover:scale-[1.01]"
            >
              <CheckIcon className="w-4 h-4 stroke-[2.5]" /> 
              {initialData ? "Actualizar Registro" : "Guardar Práctica"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};