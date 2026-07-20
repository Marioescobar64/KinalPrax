import { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ReviewModal } from "./ReviewModal";
import { useAdminStore } from "../../shared/store/adminStore";

export const Review = () => {
  const { reviews, getReviews, createReview, updateReview, deleteReview } = useAdminStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  const handleAdd = () => {
    setSelectedReview(null);
    setShowModal(true);
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Está seguro de que desea eliminar esta revisión?")) {
      try {
        await deleteReview(id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleSave = async (data) => {
    try {
      if (selectedReview) {
        await updateReview(selectedReview._id, data);
      } else {
        await createReview(data);
      }
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#072343] p-8 font-sans">
      <section className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-[#D97736] tracking-tight">Revisiones</h1>
            <p className="text-sm text-gray-300 mt-1.5">Bitácora de evaluaciones, observaciones y feedback de los supervisores</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-[#C00000] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-black/20 hover:bg-[#A00000] transition-all transform hover:scale-[1.02]"
          >
            <PlusIcon className="w-5 h-5 stroke-[2.5]" />
            Nueva Revisión
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border border-white/10">
          <table className="w-full text-sm text-[#2C1506]">
            <thead className="bg-[#FFF8F0] border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Práctica / Estudiante</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Supervisor Evaluador</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide">Observaciones / Comentario</th>
                <th className="px-6 py-4 text-left font-bold text-gray-700 tracking-wide w-40">Fecha Revisión</th>
                <th className="px-6 py-4 text-center font-bold text-gray-600 tracking-wide w-32">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {review.practica?.nombre || "Práctica no identificada"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#C00000]">
                    {review.supervisor?.nombre || "Supervisor asignado"}
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-md break-words">
                    {review.comentario}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                    {review.fecha ? new Date(review.fecha).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => handleEdit(review)} 
                        className="p-2 text-gray-400 hover:text-[#C00000] hover:bg-red-50 rounded-lg transition-all"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDelete(review._id)} 
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

        <ReviewModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSave={handleSave}
          initialData={selectedReview}
        />
      </section>
    </div>
  );
};
