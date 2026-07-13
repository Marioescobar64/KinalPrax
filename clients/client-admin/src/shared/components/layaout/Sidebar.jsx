import { useNavigate, useLocation } from "react-router-dom";
import {
  BuildingOffice2Icon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  UserIcon,
  ShieldCheckIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { label: "Compañía", path: "/dashboard/company", icon: BuildingOffice2Icon },
    { label: "Evidencia", path: "/dashboard/evidence", icon: DocumentTextIcon },
    { label: "Instituto", path: "/dashboard/institud", icon: AcademicCapIcon },
    { label: "Práctica", path: "/dashboard/practice", icon: ClipboardDocumentListIcon },
    { label: "Reporte de Horas", path: "/dashboard/reposteHoursmodel", icon: ClockIcon },
    { label: "Reseña", path: "/dashboard/review", icon: ClockIcon },
    { label: "Estudiante", path: "/dashboard/student", icon: UserIcon },
    { label: "Supervisor", path: "/dashboard/supervisor", icon: ShieldCheckIcon },
    { label: "Task", path: "/dashboard/task", icon: ShieldCheckIcon },
    { label: "Usuario", path: "/dashboard/user", icon: UsersIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-[#FFF8F0] to-[#FFF1E0] border-r border-[#C00000]/10 min-h-[calc(100vh-4rem)] p-5 shadow-[4px_0_20px_rgba(0,0,0,0.03)] flex flex-col">
      {/* Decoración superior sutil */}
      <div className="mb-6 px-4">
        <div className="h-1.5 w-10 bg-[#C00000] rounded-full opacity-30"></div>
      </div>

      <nav className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <ul className="space-y-1.5">
          {items.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => navigate(item.path)}
                  className={`
                    relative w-full group flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold 
                    transition-all duration-300 ease-in-out
                    ${active 
                      ? "text-[#C00000] bg-white shadow-md shadow-[#C00000]/5 scale-[1.02]" 
                      : "text-[#2C1506]/70 hover:bg-[#C00000]/5 hover:text-[#C00000]"}
                  `}
                >
                  {/* Indicador lateral activo */}
                  {active && (
                    <span className="absolute left-0 w-1.5 h-6 bg-[#C00000] rounded-r-full" />
                  )}
                  
                  <Icon className={`
                    w-5 h-5 transition-transform duration-300 group-hover:scale-110
                    ${active ? "text-[#C00000]" : "text-[#2C1506]/50 group-hover:text-[#C00000]"}
                  `} />
                  
                  <span className="text-[14px] tracking-tight">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Botón de Cerrar Sesión Estilizado */}
      <div className="mt-6 pt-6 border-t border-[#C00000]/10">
        <button
          onClick={handleLogout}
          className="
            group w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl font-bold text-white
            bg-gradient-to-r from-[#C00000] to-[#E60000]
            shadow-lg shadow-[#C00000]/20
            transition-all duration-300
            hover:shadow-[#C00000]/40 hover:-translate-y-0.5
            active:scale-95
            cursor-pointer
          "
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Cerrar Sesión</span>
        </button>
        <p className="text-[10px] text-center text-[#2C1506]/40 mt-4 uppercase tracking-[0.2em] font-bold">
          System Panel v2.0
        </p>
      </div>
    </aside>
  );
};