export const Spinner = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">

      {/* LOGO */}
      <img
        src="/logo.png"
        alt="Logo"
        className="w-16 opacity-90"
      />

      {/* SPINNER */}
      <div className="animate-spin rounded-full h-14 w-14 border-4 
                      border-[#A0724A] border-t-transparent">
      </div>

      {/* TEXTO OPCIONAL */}
      <p className="text-sm text-[#4A2C0A]/70">
        Cargando...
      </p>

    </div>
  );
};