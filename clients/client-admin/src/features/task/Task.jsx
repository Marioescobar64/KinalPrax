import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { TaskModal } from "./TaskModal";
import { useAdminStore } from "../../shared/store/adminStore";

export const Task = () => {
  const { tasks, getTasks, createTask, updateTask, deleteTask } = useAdminStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleAdd = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta tarea?")) {
      try {
        await deleteTask(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSave = async (data) => {
    try {
      const payload = {
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin || undefined,
        estado: data.estado,
        estudiante: data.estudiante,
        supervisor: data.supervisor
      };

      if (selectedTask) {
        await updateTask(selectedTask._id, payload);
      } else {
        await createTask(payload);
      }
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pendiente": return "bg-amber-100 text-amber-800 border border-amber-200";
      case "en progreso": return "bg-blue-100 text-blue-800 border border-blue-200";
      case "completada": return "bg-green-100 text-green-800 border border-green-200";
      default: return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Tareas de Prácticas</h1>
            <p className="text-sm text-gray-300 mt-1.5">Control, asignaciones cronológicas y estados de las actividades académicas</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nueva Tarea
          </button>
        </div>

        {/* TABLA DE CONTENIDO */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Tarea / Descripción</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Estudiante Asignado</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Supervisor Responsable</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Vigencia (Inicio - Fin)</th>
                <th className="px-6 py-4 text-center font-bold text-gray-700 tracking-wide w-28">Estado</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50/80 transition-colors vertical-align-top">
                  <td className="px-6 py-4 max-w-xs">
                    <p className="font-bold text-gray-800 text-base">{task.titulo}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{task.descripcion || "Sin descripción"}</p>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {task.estudiante?.nombre || task.nombreEstudiante || "Estudiante no asociado"}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-600">
                    {task.supervisor?.nombre || task.nombreSupervisor || "Sin Supervisor asignado"}
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold text-gray-600 whitespace-nowrap">
                    <span className="text-gray-800">{task.fechaInicio ? task.fechaInicio.split("T")[0] : ""}</span> 
                    {task.fechaFin ? ` al ${task.fechaFin.split("T")[0]}` : " (Abierta)"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wide ${getStatusColor(task.estado)}`}>
                      {task.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(task)} 
                        className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(task._id)} 
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TaskModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedTask}
        />
      </section>
    </div>
  );
};