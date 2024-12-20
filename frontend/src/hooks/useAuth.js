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
      const valid = await isAuthenticated();
      setAuthenticated(valid);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return { authenticated, loading };
};
