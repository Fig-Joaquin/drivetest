import { useState, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";

/**
 * Hook personalizado para manejar el estado de autenticación.
 * @returns {Object} authenticated - Estado de autenticación del usuario.
 */
export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await isAuthenticated();
        setAuthenticated(valid);
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setAuthenticated(false); // En caso de error, desautenticar al usuario
      } finally {
        setLoading(false); // Asegurarse de que el estado de carga siempre se detenga
      }
    };
  
    checkAuth();
  }, []);

  return { authenticated, loading };
};
