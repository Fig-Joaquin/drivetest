import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const QuizPage = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [detallesRespuestas, setDetallesRespuestas] = useState([]);

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get("http://192.168.1.115:4000/api/tests/iniciar");
        setPreguntas(response.data.preguntas || []); // Asegurar que preguntas sea un array
        setLoading(false);
        
      } catch (error) {
        console.error("Error al cargar las preguntas:", error);
      }
    };

    fetchPreguntas();
  }, []);

  const handleAnswer = (id) => {
    const preguntaActual = preguntas[currentQuestion];


    if (preguntaActual.tipo_pregunta === "única") {
      setSelectedAnswers([id]); // Solo se puede seleccionar una respuesta
    } else if (preguntaActual.tipo_pregunta === "múltiple") {
      setSelectedAnswers((prev) => {
        if (prev.includes(id)) {
          return prev.filter((answer) => answer !== id); // Deseleccionar
        }
        return [...prev, id]; // Seleccionar
      });
    }
  };

  const handleNext = () => {
    const preguntaActual = preguntas[currentQuestion];
  
    if (preguntaActual && preguntaActual.respuestas_correctas) {
      const esCorrecta =
        preguntaActual.tipo_pregunta === "única"
          ? preguntaActual.respuestas_correctas[0] === selectedAnswers[0]
          : preguntaActual.respuestas_correctas.every((resp) => selectedAnswers.includes(resp)) &&
            selectedAnswers.length === preguntaActual.respuestas_correctas.length;
  
      // Incrementa el puntaje si es correcta
      if (esCorrecta) {
        setScore((prev) => prev + 1);
      }
  
      // Guarda los detalles de la respuesta
      setDetallesRespuestas((prev) => [
        ...prev,
        {
          pregunta: preguntaActual.texto,
          alternativas: preguntaActual.alternativas,
          respuestasSeleccionadas: selectedAnswers,
          respuestasCorrectas: preguntaActual.respuestas_correctas,
          esCorrecta,
          correccion: preguntaActual.alternativas.find(
            (alt) => preguntaActual.respuestas_correctas.includes(alt.id)
          )?.correccion, // Si existe corrección
        },
      ]);
    }
  
    // Avanza a la siguiente pregunta o muestra los resultados
    if (currentQuestion < preguntas.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswers([]);
    } else {
      setShowResults(true);
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Cargando preguntas...</div>;
  }

  if (preguntas.length === 0) {
    return <div className="text-center text-xl">No hay preguntas disponibles.</div>;
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-purple-50">
        <div className="max-w-3xl w-full p-6 bg-white shadow-lg rounded-lg mt-10">
          <h2 className="text-2xl font-bold mb-4">Resultados del Test</h2>
          <p className="text-lg">Tu puntuación es: <strong>{score}/{preguntas.length}</strong></p>
  
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Respuestas Incorrectas:</h3>
            {detallesRespuestas
              .filter((detalle) => !detalle.esCorrecta)
              .map((detalle, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 bg-red-100 rounded-lg shadow-md"
                >
                  <h4 className="font-bold mb-2">{detalle.pregunta}</h4>
  
                  <ul>
                    {detalle.alternativas.map((alt) => (
                      <li
                        key={alt.id}
                        className={`${
                          detalle.respuestasCorrectas.includes(alt.id) ? 'font-bold text-green-600' : ''
                        } ${detalle.respuestasSeleccionadas.includes(alt.id) ? 'underline' : ''}`}
                      >
                        {alt.texto}
                      </li>
                    ))}
                  </ul>
  
                  {detalle.correccion && (
                    <p className="mt-2 text-sm text-gray-700">
                      <strong>Corrección:</strong> {detalle.correccion}
                    </p>
                  )}
                </div>
              ))}
          </div>
  
          <button
            onClick={handleStartQuiz}
            className="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-6"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const preguntaActual = preguntas[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center bg-purple-50">
      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-xl font-bold mb-4">{preguntaActual.texto}</h2>

        <p className="mb-4 text-gray-700 italic">
          {preguntaActual.tipo_pregunta === "única"
            ? "Pregunta de respuesta única"
            : "Pregunta de respuesta múltiple (selecciona todas las correctas)"}
        </p>

        {preguntaActual.imagenes && preguntaActual.imagenes.length > 0 && (
          <div className="flex flex-col items-center mb-4">
            <img
              src={`http://192.168.1.115/images/${preguntaActual.imagenes[0]}`}
              alt="Pregunta visual"
              className="max-w-full rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col space-y-3">
          {preguntaActual.alternativas.map((alternativa) => (
            <button
              key={alternativa.id}
              onClick={() => handleAnswer(alternativa.id)}
              className={`py-2 px-4 rounded-lg text-left border ${
                selectedAnswers.includes(alternativa.id)
                  ? "bg-purple-500 text-white"
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
