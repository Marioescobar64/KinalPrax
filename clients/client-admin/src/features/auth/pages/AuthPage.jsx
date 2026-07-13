import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";
import fondo from "../../../assets/img/fondo.png";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

  useEffect(() => {
    const role = (localStorage.getItem("userRole") || "").toUpperCase();

    if (role.includes("ADMIN")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">

      {/* Fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fondo})` }}
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/40" />

      {/* Contenido */}
      <div className="w-full max-w-md text-white px-6 backdrop-blur-sm bg-black/40 p-6 rounded-lg relative">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white flex items-center justify-center rounded-lg">
            <img
              src="/src/assets/img/logo.png"
              alt="Logo"
              className="w-24 h-20 object-contain"
            />
          </div>
        </div>

        {/* Título dinámico */}
        <h1 className="text-center text-2xl tracking-widest mb-6">
          {isLogin ? "KinalPrax" : "Recuperar Contraseña"}
        </h1>

        {/* 🔥 AQUÍ ESTÁ EL CAMBIO */}
        {isLogin ? (
          <LoginForm onForgot={() => setIsLogin(false)} />
        ) : (
          <ForgotPasswordForm onSwitch={() => setIsLogin(true)} />
        )}

        {/* Opciones */}
        <div className="flex justify-between text-sm mt-4 text-white/80">
          {isLogin ? (
            <>
              <label>
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>

              <span
                className="cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Forgot Password?
              </span>
            </>
          ) : (
            <span
              className="cursor-pointer hover:underline mx-auto"
              onClick={() => setIsLogin(true)}
            >
              Volver al login
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export { AuthPage };