import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const UserModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    rol: "estudiante",
    estado: true
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        contrasena: "" // Se deja en blanco en edición por motivos de seguridad
      });
    } else {
      setFormData({
        nombre: "",
        correo: "",
        contrasena: "",
        rol: "estudiante",
        estado: true
      });
    }
    setError("");
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDACIÓN: Si es un usuario nuevo, la contraseña es obligatoria y debe tener al menos 6 caracteres
    if (!initialData && formData.contrasena.length < 6) {
      setError("La contraseña es obligatoria y debe contener un mínimo de 6 caracteres.");
      return;
    }

    // VALIDACIÓN: Si están editando y escribieron algo en contraseña, validar longitud
    if (initialData && formData.contrasena.length > 0 && formData.contrasena.length < 6) {
      setError("Si desea actualizar la contraseña, esta debe contener al menos 6 caracteres.");
      return;
    }

    setError("");
    
    // Si la contraseña está vacía en edición, eliminamos la propiedad para no enviar un string vacío al backend
    const submissionData = { ...formData };
    if (initialData && !submissionData.contrasena) {
      delete submissionData.contrasena;
    }

    onSave(submissionData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden max-h-[95vh] border border-gray-100">
        
        {/* Cabecera */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            {initialData ? "Modificar Usuario" : "Registrar Nuevo Usuario"}
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
            
            {/* MENSAJE DE ERROR PROFESIONAL */}
            {error && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-sm font-medium animate-shake">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Error del sistema:</span> {error}
                </div>
              </div>
            )}

            {/* Nombre Completo */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Nombre Completo</label>
              <input 
                required 
                maxLength={255}
                type="text" 
                value={formData.nombre} 
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} 
                placeholder="Ej. Carlos Mendoza" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Correo */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Correo Electrónico</label>
              <input 
                required 
                maxLength={255}
                type="email" 
                value={formData.correo} 
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })} 
                placeholder="usuario@kinal.edu.gt" 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 lowercase" 
              />
            </div>

            {/* Contraseña */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Contraseña de Acceso</label>
                {initialData && <span className="text-[10px] text-gray-400 font-semibold">(Dejar vacío para no cambiar)</span>}
              </div>
              <input 
                type="password" 
                value={formData.contrasena} 
                onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })} 
                placeholder={initialData ? "••••••••" : "Mínimo 6 caracteres"} 
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800" 
              />
            </div>

            {/* Rol de Acceso (Enum de Mongoose) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Rol del Sistema</label>
              <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#C00000]/5 focus:border-[#C00000] outline-none transition text-sm text-gray-800 bg-white"
              >
                <option value="estudiante">Estudiante</option>
                <option value="supervisor">Supervisor</option>
                <option value="coordinador">Coordinador</option>
              </select>
            </div>

            {/* Estado Selector (Boolean de Mongoose) */}
            <div className="space-y-1 pt-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Estado de la cuenta</label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl p-2.5 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition has-[:checked]:border-green-500 has-[:checked]:bg-green-50/30">
                  <input 
                    type="radio" 
                    name="estado" 
                    checked={formData.estado === true}
                    onChange={() => setFormData({ ...formData, estado: true })}
                    className="accent-green-600"
                  />
                  Activo
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl p-2.5 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition has-[:checked]:border-red-500 has-[:checked]:bg-red-50/30">
                  <input 
                    type="radio" 
                    name="estado" 
                    checked={formData.estado === false}
                    onChange={() => setFormData({ ...formData, estado: false })}
                    className="accent-red-600"
                  />
                  Inactivo
                </label>
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
              {initialData ? "Guardar Cambios" : "Crear Usuario"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};  