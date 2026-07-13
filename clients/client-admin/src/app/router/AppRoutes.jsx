import { Navigate, Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layaouts/DashboardPage";
import { Company } from "../../features/company/Company.jsx";
import { Evidence } from "../../features/evidence/Evidence.jsx";
import { Institution } from "../../features/institud/Institud.jsx";
import { Practice } from "../../features/practice/Practice.jsx";
import { ReposteHours } from "../../features/reposteHoursmodel/ReposteHours.jsx";
import { Review } from "../../features/review/Review.jsx";
import { Student } from "../../features/student/Student.jsx";
import { Supervisor } from "../../features/supervisor/Supervisor.jsx";
import { Task } from "../../features/task/Task.jsx";
import { User } from "../../features/user/User.jsx";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("userRole") ?? "";
  const isAdmin = role.toUpperCase().includes("ADMIN");

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<AuthPage />} />
      <Route path="/login" element={<Navigate to="/" replace />} />

      {/* PROTEGIDO POR ROLE */}
      <Route 
        path="/dashboard" 
        element={
          <RequireAdmin>
            <DashboardPage />
          </RequireAdmin>
        }
      >
        {/* Rutas internas (Paths relativos, sin "/" al inicio) */}
        <Route path="company" element={<Company />} />
        <Route path="evidence" element={<Evidence />} />
      <Route path="institud" element={<Institution />} />
        <Route path="practice" element={<Practice />} />
        
        {/* Ajustado para coincidir con el path del Sidebar que pasaste */}
        <Route path="reposteHoursmodel" element={<ReposteHours />} />
        
        <Route path="review" element={<Review />} />
        <Route path="student" element={<Student />} />
        <Route path="supervisor" element={<Supervisor />} />
        <Route path="task" element={<Task />} />
        <Route path="user" element={<User />} />
        
        {/* Al entrar a /dashboard, muestra por defecto el Dashboard o Usuario */}
        <Route index element={<Navigate to="user" replace />} />
      </Route>

      <Route path="*" element={<h1>Página no encontrada</h1>} />
    </Routes>
  );
};