import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext); // Actualiza el estado global

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    setAuthenticated(false); // Cambia el estado a "no autenticado"
    navigate("/login"); // Redirige al login
  };

  return handleLogout;
};
