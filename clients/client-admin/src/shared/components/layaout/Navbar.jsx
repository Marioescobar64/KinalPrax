import imgLogo from "../../../assets/img/logo.png";

export const Navbar = () => {
  return (
    <nav className="
      sticky top-0 z-50
      bg-[#041F3D]/95 backdrop-blur-lg
      border-b border-[#18A7A1]/10
    ">
      <div className="w-full px-6 h-16 flex items-center justify-between">

        {/* 🔷 IZQUIERDA */}
        <div className="flex items-center gap-4">

          <img
            src={imgLogo}
            alt="GIPS"
            className="h-9 w-auto object-contain"
          />

          {/* Línea separadora */}
          <div className="h-6 w-px bg-[#18A7A1]/20" />

          <h1 className="text-[#E6E6E6] text-lg tracking-wider font-semibold">
            GIPS
          </h1>

        </div>

        {/* 🔷 CENTRO (opcional búsqueda o título dinámico) */}
        <div className="hidden md:block">
          <p className="text-sm text-[#18A7A1]/80 tracking-wide">
            Panel Administrativo
          </p>
        </div>

        {/* 🔷 DERECHA (simple pero elegante) */}
        <div className="flex items-center gap-3">

          {/* Botón acción */}
          <button className="
            px-4 py-1.5 rounded-lg
            bg-[#0B3A66]
            text-[#E6E6E6]
            text-sm
            hover:bg-[#18A7A1]/20
            transition
          ">
            Nuevo
          </button>

          {/* Avatar minimal */}
           {/*Hola */}
          <div className="
            w-9 h-9 rounded-full
            bg-gradient-to-br from-[#18A7A1] to-[#0B3A66]
            flex items-center justify-center
            text-xs font-bold text-white
          ">
            G
          </div>

        </div>

      </div>
    </nav>
  );
};