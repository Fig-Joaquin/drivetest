import api from "../utils/axiosConfig";

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/users/perfil");
    return response.data; // Retorna los datos del usuario
  } catch (err) {
    const message = err.response?.data?.message || "Error al obtener el perfil del usuario.";
    throw new Error(message); // Lanza un error para que el componente pueda manejarlo
  }
};
