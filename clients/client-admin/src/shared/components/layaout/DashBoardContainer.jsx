import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import fondo from "../../../assets/img/fondo.png";

export const DashBoardContainer = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#041F3D] relative overflow-hidden">
      
      {/* Imagen de fondo global (opcional, si quieres que cubra todo) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${fondo})`, opacity: 0.2 }}
      />

      {/* Navbar */}
      <div className="relative z-10 bg-[#0B3A66]/90 backdrop-blur-md border-b border-[#18A7A1]/30">
        <Navbar />
      </div>

      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <div className="bg-[#041F3D]/95 backdrop-blur-md border-r border-[#18A7A1]/20 min-w-[220px]">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="relative rounded-xl overflow-hidden shadow-lg border border-[#18A7A1]/20 bg-[#0B3A66]/40 backdrop-blur-sm p-6">
            {/* Aquí es donde se inyectarán las otras clases/componentes */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};