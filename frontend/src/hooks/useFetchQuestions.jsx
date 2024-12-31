import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/axiosConfig"; // Importa tu instancia de axios

export const useFetchQuestions = (url) => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await api.get(url);
        setPreguntas(response.data.preguntas || []);
      } catch (err) {
        if (err.response) {
          // Respuesta del servidor con un error (4xx o 5xx)
          setError(err.response.data.message || "Error al cargar preguntas.");
        } else if (err.request) {
          // El servidor no respondió
          setError("No se pudo conectar con el servidor. Verifica tu conexión.");
        } else {
          // Otros errores
          setError("Ocurrió un error desconocido.");
        }
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchPreguntas();
  }, [url]);

  return { preguntas, loading, error };
};
