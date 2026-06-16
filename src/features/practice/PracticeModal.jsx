import { useState, useEffect } from "react";
import { XMarkIcon, PhotoIcon, CheckIcon } from "@heroicons/react/24/outline";

export const PracticeModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    status: "En Curso",
    image: ""
  });

  // Efecto para cargar los datos cuando se edita o limpiar cuando es nuevo
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ title: "", company: "", startDate: "", endDate: "", status: "En Curso", image: "" });
    }
  }, [initialData, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    // Fondo oscuro más sólido y centrado
    <div className="fixed inset-0 bg-[#2C1506]/60 backdrop-blur-sm flex items-center justify-center z-50 p-6 md:p-10">
      
      {/* max-w-6xl (Ancho Extra Grande) y h-[90vh] (Alto Extra Grande) */}
      <div className="bg-black rounded-3xl w-full max-w-6xl h-[90vh] shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        
        {/* Cabecera - Padding más grande y borde más suave */}
        <div className="px-10 py-7 border-b border-gray-100 flex items-center justify-between bg-[#FFF8F0]/40">
          <h2 className="text-3xl font-extrabold text-[#2C1506] tracking-tight">
            {initialData ? "Editar Registro de Práctica" : "Registrar Nueva Práctica Profesional"}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          >
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        {/* Formulario - Ocupa todo el alto disponible */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          
          {/* Cuerpo - Padding ENORME (px-12, py-10) y scroll interno */}
          <div className="flex-1 p-10 md:p-12 overflow-y-auto space-y-10 bg-white">
            
            {/* Sección 1: Imagen - Más grande y estilizada */}
            <div className="space-y-3">
              <label className="block text-sm font-bold uppercase tracking-widest text-[#2C1506]/60">
                Imagen de Portada o Logotipo de Empresa
              </label>
              
              {/* Contenedor dropzone más alto y ancho */}
              <div className="relative group border-2 border-dashed border-gray-200 hover:border-[#C00000]/50 rounded-2xl p-6 transition-all bg-gray-50/30 flex flex-col items-center justify-center min-h-[180px] cursor-pointer shadow-inner">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                
                {formData.image ? (
                  <div className="flex items-center gap-6 w-full max-w-2xl mx-auto">
                    {/* Imagen más grande */}
                    <img 
                      src={formData.image} 
                      alt="Vista previa" 
                      className="w-32 h-32 object-cover rounded-2xl border-2 border-white shadow-lg ring-1 ring-gray-100" 
                    />
                    <div className="text-left flex-1">
                      <p className="text-xl font-semibold text-[#2C1506]">¡Imagen cargada correctamente!</p>
                      <p className="text-base text-gray-500 mt-1">Haz clic en este recuadro para seleccionar una imagen diferente.</p>
                      <span className="inline-block mt-3 text-sm text-[#C00000] font-medium bg-red-50 px-3 py-1 rounded-full border border-red-100">Cambiar Imagen</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-3 pointer-events-none">
                    {/* Icono más grande y contenedor más vistoso */}
                    <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-md transform group-hover:scale-110 transition-transform">
                      <PhotoIcon className="w-8 h-8 text-[#C00000]" />
                    </div>
                    <div className="text-xl text-gray-700">
                      Arrastra tu imagen aquí o <span className="font-bold text-[#C00000] underline">haz clic para buscarla</span>
                    </div>
                    <p className="text-sm text-gray-500">Formatos aceptados: PNG, JPG, JPEG (Máx. 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sección 2: Datos Generales */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#2C1506] border-b pb-3 border-gray-100">Información General</h3>
              
              {/* Grid - Gap más grande (gap-x-10, gap-y-6) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
                
                {/* Título - Input más grande (py-3.5) */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="block text-base font-semibold text-[#2C1506]">Título descriptivo de la práctica</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    placeholder="Ej. Práctica Profesional en Desarrollo Web Frontend y UI/UX" 
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm placeholder:text-gray-400" 
                  />
                </div>

                {/* Empresa */}
                <div className="space-y-1.5">
                  <label className="block text-base font-semibold text-[#2C1506]">Nombre de la Empresa o Institución</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.company} 
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })} 
                    placeholder="Ej. Corporación Tecnológica Solutions S.A. de C.V." 
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm placeholder:text-gray-400" 
                  />
                </div>

                {/* Estado */}
                <div className="space-y-1.5">
                  <label className="block text-base font-semibold text-[#2C1506]">Estado Actual de la Práctica</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })} 
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm cursor-pointer appearance-none"
                  >
                    <option value="En Curso">🔵 En Curso</option>
                    <option value="Completada">🟢 Completada</option>
                    <option value="Pausada">🟡 Pausada</option>
                  </select>
                </div>

                {/* Fecha Inicio */}
                <div className="space-y-1.5">
                  <label className="block text-base font-semibold text-[#2C1506]">Fecha de Inicio Oficial</label>
                  <input 
                    required 
                    type="date" 
                    value={formData.startDate} 
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} 
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm" 
                  />
                </div>

                {/* Fecha Fin */}
                <div className="space-y-1.5">
                  <label className="block text-base font-semibold text-[#2C1506]">Fecha estimada de Finalización</label>
                  <input 
                    required 
                    type="date" 
                    value={formData.endDate} 
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} 
                    className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#C00000]/10 focus:border-[#C00000] outline-none transition text-base bg-white shadow-sm" 
                  />
                </div>
              </div>
            </div>
            
            <div className="h-4"></div>
          </div>

          {/* Footer - Corregida la sintaxis en la etiqueta del botón de cancelar */}
          <div className="px-10 py-6 bg-gray-50/80 border-t border-gray-100 flex gap-4 justify-end">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
            >
              Cancelar y Cerrar
            </button>
            <button 
              type="submit" 
              className="flex items-center gap-2.5 bg-[#C00000] text-white px-8 py-3 rounded-xl text-base font-bold hover:bg-[#A00000] shadow-md transition-all transform hover:scale-[1.02]"
            >
              <CheckIcon className="w-5 h-5" /> 
              {initialData ? "Actualizar Registro" : "Crear Nueva Práctica"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};