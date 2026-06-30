import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { StudentModal } from "./StudentModal";

const mockStudents = [
  { id: 1, carnet: "2022010", nombre: "Juan Fernando Pérez", carrera: "Informática", telefono: "5544-3322", correo: "juan.perez@kinal.edu.gt", horasRequeridas: 150, horasAcumuladas: 75 },
  { id: 2, carnet: "2022045", nombre: "María Andre García", carrera: "Electrónica", telefono: "4411-2233", correo: "maria.garcia@kinal.edu.gt", horasRequeridas: 200, horasAcumuladas: 180 },
];

export const Student = () => {
  const [students, setStudents] = useState(mockStudents);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleAdd = () => {
    setSelectedStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este estudiante?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSave = (data) => {
    if (selectedStudent) {
      setStudents(students.map(s => s.id === selectedStudent.id ? { ...data, id: selectedStudent.id } : s));
    } else {
      setStudents([...students, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Estudiantes</h1>
            <p className="text-sm text-gray-300 mt-1.5">Gestión de estudiantes en prácticas técnico-laborales</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nuevo Estudiante
          </button>
        </div>

        {/* TABLA ADAPTABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Carné</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Nombre Completo</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Carrera</th>
                <th className="px-6 py-4 text-left font-bold text-gray-500 tracking-wide">Contacto</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Progreso de Horas</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => {
                const porcentaje = Math.min(Math.round((student.horasAcumuladas / student.horasRequeridas) * 100), 100) || 0;
                
                return (
                  <tr key={student.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-[#C00000] text-sm whitespace-nowrap">{student.carnet}</td>
                    <td className="px-6 py-4 font-bold text-gray-800 text-base">{student.nombre}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{student.carrera}</td>
                    <td className="px-6 py-4 text-gray-500 space-y-0.5">
                      <p className="lowercase text-xs">{student.correo}</p>
                      <p className="text-gray-400 font-medium text-xs">{student.telefono || "Sin teléfono"}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-48 space-y-1">
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                          <span>{student.horasAcumuladas} / {student.horasRequeridas} hrs</span>
                          <span>{porcentaje}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${porcentaje === 100 ? "bg-green-500" : "bg-[#D97736]"}`}
                            style={{ width: `${porcentaje}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(student)} className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all">
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(student.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* MODAL MODULAR VINCULADO */}
        <StudentModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedStudent}
        />
      </section>
    </div>
  );
};