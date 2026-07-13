import { create } from "zustand";
import * as api from "../api/admin.js";

const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    const joined = data.errors
      .map((item) => item?.msg || item?.message || item?.path)
      .filter(Boolean)
      .join(", ");

    if (joined) return joined;
  }

  if (Array.isArray(data?.details) && data.details.length > 0) {
    const joined = data.details
      .map((item) => item?.message || item?.msg || item)
      .filter(Boolean)
      .join(", ");

    if (joined) return joined;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  if (Array.isArray(data?.error) && data.error.length > 0) {
    const joined = data.error
      .map((item) => item?.message || item?.msg || item?.field)
      .filter(Boolean)
      .join(", ");

    if (joined) return joined;
  }

  return fallbackMessage;
};

export const useAdminStore = create((set, get) => ({
  companies: [],
  evidences: [],
  institutions: [],
  practices: [],
  progressRecords: [],
  reviews: [],
  students: [],
  supervisors: [],
  tasks: [],
  users: [],
  loading: false,
  error: null,

  // ================= COMPANIES =================
  getCompanies: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getCompanies();
      set({ companies: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener compañías"),
        loading: false,
      });
    }
  },

  createCompany: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createCompany(data);
      await get().getCompanies();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear compañía");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateCompany: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateCompany(id, data);
      await get().getCompanies();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar compañía");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteCompany: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteCompany(id);
      set({
        companies: get().companies.filter((c) => c._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar compañía");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= EVIDENCES =================
  getEvidences: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getDocuments();
      set({ evidences: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener evidencias"),
        loading: false,
      });
    }
  },

  createEvidence: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createDocument(data);
      await get().getEvidences();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear evidencia");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateEvidence: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateDocument(id, data);
      await get().getEvidences();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar evidencia");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteEvidence: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteDocument(id);
      set({
        evidences: get().evidences.filter((e) => e._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar evidencia");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= INSTITUTIONS =================
  getInstitutions: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getInstitutions();
      set({ institutions: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener instituciones"),
        loading: false,
      });
    }
  },

  createInstitution: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createInstitution(data);
      await get().getInstitutions();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear institución");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateInstitution: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateInstitution(id, data);
      await get().getInstitutions();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar institución");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteInstitution: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteInstitution(id);
      set({
        institutions: get().institutions.filter((i) => i._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar institución");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= PRACTICES =================
  getPractices: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getPractices();
      set({ practices: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener prácticas"),
        loading: false,
      });
    }
  },

  createPractice: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createPractice(data);
      await get().getPractices();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear práctica");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updatePractice: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updatePractice(id, data);
      await get().getPractices();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar práctica");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deletePractice: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deletePractice(id);
      set({
        practices: get().practices.filter((p) => p._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar práctica");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= REPOSTE HOURS (PROGRESS) =================
  getProgressRecords: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getProgressRecords();
      set({ progressRecords: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener progreso de horas"),
        loading: false,
      });
    }
  },

  createProgressRecord: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createProgress(data);
      await get().getProgressRecords();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al registrar progreso de horas");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateProgressRecord: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateProgress(id, data);
      await get().getProgressRecords();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar progreso de horas");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteProgressRecord: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteProgress(id);
      set({
        progressRecords: get().progressRecords.filter((p) => p._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar progreso de horas");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= REVIEWS =================
  getReviews: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getReviews();
      set({ reviews: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener reseñas"),
        loading: false,
      });
    }
  },

  createReview: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createReview(data);
      await get().getReviews();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear reseña");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateReview: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateReview(id, data);
      await get().getReviews();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar reseña");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteReview: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteReview(id);
      set({
        reviews: get().reviews.filter((r) => r._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar reseña");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= STUDENTS =================
  getStudents: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getStudentRecords();
      set({ students: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener estudiantes"),
        loading: false,
      });
    }
  },

  createStudent: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createStudentRecord(data);
      await get().getStudents();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear estudiante");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateStudent: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateStudentRecord(id, data);
      await get().getStudents();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar estudiante");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteStudent: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteStudentRecord(id);
      set({
        students: get().students.filter((s) => s._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar estudiante");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= SUPERVISORS =================
  getSupervisors: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getContactRecords();
      set({ supervisors: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener supervisores"),
        loading: false,
      });
    }
  },

  createSupervisor: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createContact(data);
      await get().getSupervisors();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear supervisor");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateSupervisor: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateContact(id, data);
      await get().getSupervisors();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar supervisor");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteSupervisor: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteContact(id);
      set({
        supervisors: get().supervisors.filter((s) => s._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar supervisor");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= TASKS =================
  getTasks: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.getTaskRecords();
      set({ tasks: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener tareas"),
        loading: false,
      });
    }
  },

  createTask: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.createTask(data);
      await get().getTasks();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear tarea");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateTask: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.updateTask(id, data);
      await get().getTasks();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar tarea");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteTask: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.deleteTask(id);
      set({
        tasks: get().tasks.filter((t) => t._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar tarea");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  // ================= USERS =================
  getUsers: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.obtenerUsuarios();
      set({ users: response.data.data, loading: false });
    } catch (error) {
      set({
        error: getApiErrorMessage(error, "Error al obtener usuarios"),
        loading: false,
      });
    }
  },

  createUser: async (data) => {
    try {
      set({ loading: true, error: null });
      await api.crearUsuario(data);
      await get().getUsers();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al crear usuario");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  updateUser: async (id, data) => {
    try {
      set({ loading: true, error: null });
      await api.actualizarUsuario(id, data);
      await get().getUsers();
      set({ loading: false });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al actualizar usuario");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },

  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      await api.eliminarUsuario(id);
      set({
        users: get().users.filter((u) => u._id !== id),
        loading: false,
      });
    } catch (error) {
      const msg = getApiErrorMessage(error, "Error al eliminar usuario");
      set({ error: msg, loading: false });
      throw new Error(msg);
    }
  },
}));
