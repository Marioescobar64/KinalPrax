import { useState } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { UserModal } from "./UserModal";

const mockUsers = [
  { id: 1, nombre: "Carlos Mendoza", correo: "cmendoza@kinal.edu.gt", rol: "coordinador", estado: true },
  { id: 2, nombre: "Estuardo López", correo: "elopez@kinal.edu.gt", rol: "supervisor", estado: true },
  { id: 3, nombre: "Mario Escobar", correo: "estudiante@kinal.edu.gt", rol: "estudiante", estado: false },
];

export const User = () => {
  const [users, setUsers] = useState(mockUsers);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAdd = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Está seguro de que desea eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSave = (data) => {
    if (selectedUser) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...data, id: selectedUser.id } : u));
    } else {
      setUsers([...users, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
  };

  // Helper para pintar badges estilizados por cada rol
  const getRolBadge = (rol) => {
    const styles = {
      coordinador: "bg-purple-100 text-purple-700 border-purple-200",
      supervisor: "bg-blue-100 text-blue-700 border-blue-200",
      estudiante: "bg-orange-100 text-orange-700 border-orange-200",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[rol] || "bg-gray-100 text-gray-700"}`}>
        {rol}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Usuarios</h1>
            <p className="text-sm text-gray-300 mt-1.5">Gestión de credenciales y roles de acceso al sistema</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nuevo Usuario
          </button>
        </div>

        {/* TABLA ADAPTABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Nombre Completo</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Correo Electrónico</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Rol Asignado</th>
                <th className="px-6 py-4 text-left font-bold text-gray-600 tracking-wide">Estado</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800 text-base">{user.nombre}</td>
                  <td className="px-6 py-4 text-gray-600 font-medium lowercase">{user.correo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getRolBadge(user.rol)}</td>
                  <td className="px-6 py-4">
                    {user.estado ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Inactivo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(user)} className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all">
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* COMPONENTE MODAL MODULAR */}
        <UserModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedUser}
        />
      </section>
    </div>
  );
};