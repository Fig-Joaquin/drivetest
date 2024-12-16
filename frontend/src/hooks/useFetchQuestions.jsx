import { useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";

export const useFetchQuestions = (url) => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(url);
        setPreguntas(response.data.preguntas || []); // Asegurar que preguntas sea un array
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, [url]);

  return { preguntas, loading, error };
};


// Validar que el hook reciba una URL válida como prop
useFetchQuestions.propTypes = {
  url: propTypes.string.isRequired,
};