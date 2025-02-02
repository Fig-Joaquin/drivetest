import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

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
      // Muestra la modificación.
      toast.success("Sesión cerrada con éxito.", { position: "top-center" });
      // Redirige al inicio o a otra página deseada
      navigate("/");
    } catch (error) {
      toast.error("Error al cerrar sesión.", { position: "top-center" });
    } finally {
      setLoading(false); // Finalizar el estado de carga
    }
  };

  return { handleLogout, loading }; // Devuelve la función de logout y el estado de carga
};
