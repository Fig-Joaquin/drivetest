import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Tu baseURL desde las variables de entorno
  headers: {
    "Content-Type": "application/json", // Tipo de contenido
  },
  withCredentials: true, // Para incluir cookies en las solicitudes
});

export default api;
