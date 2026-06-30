import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const StudentModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    carnet: "",
    nombre: "",
    carrera: "",
    telefono: "",
    correo: "",
    horasRequeridas: "",
    horasAcumuladas: 0
  });
  
  // Estado para capturar errores de validación
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        carnet: "",
        nombre: "",
        carrera: "",
        telefono: "",
        correo: "",
        horasRequeridas: "",
        horasAcumuladas: 0
      });
    }
    setError(""); // Limpiar errores al abrir/cerrar
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const req = Number(formData.horasRequeridas);
    const acum = Number(formData.horasAcumuladas);

    // VALIDACIÓN ESTRICTA: Bloquea el guardado si se pasa del límite
    if (acum > req) {
      setError(`Las horas acumuladas (${acum} hrs) no pueden ser mayores a las horas requeridas (${req} hrs).`);
      return; // Detiene la ejecución por completo
    }

    setError(""); // Limpia el error si todo está correcto
    onSave({
      ...formData,
      horasRequeridas: req,
      horasAcumuladas: acum
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl flex flex-col overflow-hidden max-h-[95vh] border border-gray-100">
        
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Editar Información del Estudiante" : "Registrar Nuevo Estudiante"}
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
            
            {/* ALERTA DE ERROR PROFESIONAL */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-sm font-medium animate-shake">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Error de validación:</span> {error}
                </div>
              </div>
            )}

            {/* Fila Combinada: Carné y Carrera */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Carné / Código</label>
                <input 
                  required 
                  maxLength={50}
                  type="text" 
                  value={formData.carnet} 
                  onChange={(e) => setFormData({ ...formData, carnet: e.target.value })} 
                  placeholder="Ej. 2022010" 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm font-mono text-gray-800" 
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Carrera Técnico-Profesional</label>
                <input 
                  required 
                  maxLength={255}
                  type="text" 
                  value={formData.carrera} 
                  onChange={(e) => setFormData({ ...formData, carrera: e.target.value })} 
                  placeholder="Ej. Bachillerato en Informática" 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
                />
              </div>
            </div>

            {/* Nombre Completo */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Nombre Completo</label>
              <input 
                required 
                maxLength={255}
                type="text" 
                value={formData.nombre} 
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                placeholder="Nombres y Apellidos" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Fila Combinada: Correo y Teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Correo Institucional</label>
                <input 
                  required 
                  maxLength={255}
                  type="email" 
                  value={formData.correo} 
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })} 
                  placeholder="estudiante@kinal.edu.gt" 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 lowercase" 
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Teléfono</label>
                <input 
                  maxLength={20}
                  type="tel" 
                  value={formData.telefono} 
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} 
                  placeholder="Ej. 5566-7788" 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
                />
              </div>
            </div>

            {/* Configuración de Horas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Horas Requeridas</label>
                <input 
                  required 
                  min={0}
                  type="number" 
                  value={formData.horasRequeridas} 
                  onChange={(e) => setFormData({ ...formData, horasRequeridas: e.target.value })} 
                  placeholder="Ej. 150" 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Horas Acumuladas Iniciales</label>
                <input 
                  min={0}
                  type="number" 
                  value={formData.horasAcumuladas} 
                  onChange={(e) => setFormData({ ...formData, horasAcumuladas: e.target.value })} 
                  placeholder="0" 
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
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
              {initialData ? "Guardar Cambios" : "Crear Estudiante"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};