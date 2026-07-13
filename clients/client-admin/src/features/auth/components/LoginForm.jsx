import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const LoginForm = ({ onForgot }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 🔥 VALIDACIÓN
    if (!emailOrUsername.trim() || !password.trim()) {
      toast.error("Por favor ingresa usuario y contraseña.");
      return;
    }

    setLoading(true);

    try {
      const authUrl =
        import.meta.env.VITE_AUTH_API_URL ??
        "http://localhost:5277/api/v1/auth/login";

      const response = await axios.post(authUrl, {
        emailOrUsername: emailOrUsername.trim(),
        password: password.trim(),
      });

      const data = response.data;
      const role = data?.userDetails?.role ?? "";
      const isAdmin = role.toUpperCase().includes("ADMIN");

      // ❌ fallo backend
      if (!data?.success) {
        toast.error(data?.message || "Inicio de sesión falló.");
        return;
      }

      // ❌ no admin
      if (!isAdmin) {
        toast.error("Acceso restringido: solo administradores.");
        return;
      }

      // ✅ guardar datos
      localStorage.setItem("authToken", data.token ?? "");
      localStorage.setItem("userRole", role);
      localStorage.setItem(
        "userName",
        data?.userDetails?.username ?? "Administrador"
      );

      toast.success("Bienvenido administrador");

      // 🔥 REDIRECCIÓN
      navigate("/dashboard", { replace: true });

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Error al iniciar sesión.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* EMAIL / USUARIO */}
      <div>
        <label className="block text-sm font-medium text-gray-800 mb-1.5">
          Email o Usuario
        </label>
        <input
          type="text"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          placeholder="correo@ejemplo.com o usuario"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-main-blue hover:opacity-90 text-white 
                   font-medium py-2.5 px-4 rounded-lg 
                   transition-colors duration-200 text-sm
                   disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? "Verificando..." : "Iniciar Sesión"}
      </button>

      {/* LINK */}
      <p className="text-center text-sm">
        <button
          type="button"
          onClick={onForgot}
          className="text-main-blue hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </p>

    </form>
  );
};