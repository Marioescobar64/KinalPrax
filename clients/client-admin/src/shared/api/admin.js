import { axiosAdmin } from "../../shared/api/api.js";

// ================= COMPANIES =================
export const getCompanies = async () => {
  return await axiosAdmin.get("/company");
};

export const createCompany = async (data) => {
  return await axiosAdmin.post("/company", data);
};

export const updateCompany = async (id, data) => {
  return await axiosAdmin.put(`/company/${id}`, data);
};

export const deleteCompany = async (id) => {
  return await axiosAdmin.delete(`/company/${id}`);
};

// ================= EVIDENCES (DOCUMENTS) =================
export const getDocuments = async () => {
  return await axiosAdmin.get("/evidence");
};

export const createDocument = async (data) => {
  return await axiosAdmin.post("/evidence", data);
};

export const updateDocument = async (id, data) => {
  return await axiosAdmin.put(`/evidence/${id}`, data);
};

export const deleteDocument = async (id) => {
  return await axiosAdmin.delete(`/evidence/${id}`);
};

// ================= INSTITUTIONS =================
export const getInstitutions = async () => {
  return await axiosAdmin.get("/institud");
};

export const createInstitution = async (data) => {
  return await axiosAdmin.post("/institud", data);
};

export const updateInstitution = async (id, data) => {
  return await axiosAdmin.put(`/institud/${id}`, data);
};

export const deleteInstitution = async (id) => {
  return await axiosAdmin.delete(`/institud/${id}`);
};

// ================= PRACTICES =================
export const getPractices = async () => {
  return await axiosAdmin.get("/practice");
};

export const createPractice = async (data) => {
  return await axiosAdmin.post("/practice", data);
};

export const updatePractice = async (id, data) => {
  return await axiosAdmin.put(`/practice/${id}`, data);
};

export const deletePractice = async (id) => {
  return await axiosAdmin.delete(`/practice/${id}`);
};

// ================= REPOSTE HOURS (PROGRESS) =================
export const getProgressRecords = async () => {
  return await axiosAdmin.get("/reposte");
};

export const createProgress = async (data) => {
  return await axiosAdmin.post("/reposte", data);
};

export const updateProgress = async (id, data) => {
  return await axiosAdmin.put(`/reposte/${id}`, data);
};

export const deleteProgress = async (id) => {
  return await axiosAdmin.delete(`/reposte/${id}`);
};

// ================= REVIEWS =================
export const getReviews = async () => {
  return await axiosAdmin.get("/review");
};

export const createReview = async (data) => {
  return await axiosAdmin.post("/review", data);
};

export const updateReview = async (id, data) => {
  return await axiosAdmin.put(`/review/${id}`, data);
};

export const deleteReview = async (id) => {
  return await axiosAdmin.delete(`/review/${id}`);
};

// ================= STUDENTS =================
export const getStudentRecords = async () => {
  return await axiosAdmin.get("/student");
};

export const createStudentRecord = async (data) => {
  return await axiosAdmin.post("/student", data);
};

export const updateStudentRecord = async (id, data) => {
  return await axiosAdmin.put(`/student/${id}`, data);
};

export const deleteStudentRecord = async (id) => {
  return await axiosAdmin.delete(`/student/${id}`);
};

// ================= SUPERVISORS (CONTACTS) =================
export const getContactRecords = async () => {
  return await axiosAdmin.get("/supervisor");
};

export const createContact = async (data) => {
  return await axiosAdmin.post("/supervisor", data);
};

export const updateContact = async (id, data) => {
  return await axiosAdmin.put(`/supervisor/${id}`, data);
};

export const deleteContact = async (id) => {
  return await axiosAdmin.delete(`/supervisor/${id}`);
};

// ================= TASKS =================
export const getTaskRecords = async () => {
  return await axiosAdmin.get("/task");
};

export const createTask = async (data) => {
  return await axiosAdmin.post("/task", data);
};

export const updateTask = async (id, data) => {
  return await axiosAdmin.put(`/task/${id}`, data);
};

export const deleteTask = async (id) => {
  return await axiosAdmin.delete(`/task/${id}`);
};

// ================= USERS =================
export const obtenerUsuarios = async () => {
  return await axiosAdmin.get("/user");
};

export const obtenerUsuario = async (id) => {
  return await axiosAdmin.get(`/user/${id}`);
};

export const crearUsuario = async (data) => {
  return await axiosAdmin.post("/user", data);
};

export const actualizarUsuario = async (id, data) => {
  return await axiosAdmin.put(`/user/${id}`, data);
};

export const eliminarUsuario = async (id) => {
  return await axiosAdmin.delete(`/user/${id}`);
};