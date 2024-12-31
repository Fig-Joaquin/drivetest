import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axiosConfig"; // Axios configurado para manejar cookies

export const useLogout = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext); // Actualiza el estado global
  const [loading, setLoading] = useState(false); // Indicador de carga

  const handleLogout = async () => {
    setLoading(true); // Iniciar el estado de carga
    try {
      // Realiza una solicitud al backend para eliminar la cookie
      await api.post("/users/logout");

      // Actualiza el estado global a "no autenticado"
      setAuthenticated(false);

      // Redirige al inicio o a otra página deseada
      navigate("/");
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return { handleLogout, loading }; // Devuelve la función de logout y el estado de carga
};
