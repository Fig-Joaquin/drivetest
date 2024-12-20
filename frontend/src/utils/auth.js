const API_URL = import.meta.env.VITE_API_URL; // URL del backend

/**
 * Verifica si el token de usuario es válido.
 * @returns {Promise<boolean>} Retorna `true` si el token es válido, de lo contrario `false`.
 */

export const isAuthenticated = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await fetch(`${API_URL}/auth/validate-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.valid; // Retorna `true` si el token es válido
    }

    return false;
  } catch (error) {
    console.error("Error validando el token:", error);
    return false;
  }
};
