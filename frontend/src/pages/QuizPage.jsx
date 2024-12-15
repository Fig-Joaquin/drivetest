import { useEffect, useState } from "react";
import axios from "axios";

export const QuizPage = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar preguntas desde el backend usando Axios
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get("http://localhost:4000/preguntas");
        setPreguntas(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
      }
    };

    fetchPreguntas();
  }, []);

  const handleAnswer = (id) => {
    setSelectedAnswer(id);

    const isCorrect = preguntas[currentQuestion].respuestas_correctas.includes(id);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < preguntas.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      alert(`¡Quiz finalizado! Tu puntuación es ${score}/${preguntas.length}`);
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Cargando preguntas...</div>;
  }

  if (preguntas.length === 0) {
    return <div className="text-center text-xl">No hay preguntas disponibles.</div>;
  }

  const preguntaActual = preguntas[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center bg-purple-50">
      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-xl font-bold mb-4">{preguntaActual.texto}</h2>

        <div className="flex flex-col space-y-3">
          {preguntaActual.alternativas.map((alternativa) => (
            <button
              key={alternativa.id}
              onClick={() => handleAnswer(alternativa.id)}
              className={`py-2 px-4 rounded-lg text-left border ${
                selectedAnswer === alternativa.id
                  ? preguntaActual.respuestas_correctas.includes(alternativa.id)
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-purple-100 hover:bg-purple-200"
              }`}
            >
              {alternativa.texto}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={handleNext}
            className="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            {currentQuestion < preguntas.length - 1 ? "Siguiente" : "Finalizar"}
          </button>
        </div>
      </div>
    </div>
  );
};


