import { useState } from "react";
import { useFetchQuestions } from "../hooks/useFetchQuestions";
import { Results } from "./Results";
import { HeaderQuiz } from "../components/HeaderQuiz";
import { MobileNav } from "../components/NavBar";

const API_URL = import.meta.env.VITE_API_URL;

export const QuizPage = () => {


  const { preguntas, loading, error } = useFetchQuestions(`${API_URL}/api/tests/iniciar`);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [detallesRespuestas, setDetallesRespuestas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(0);
  




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
      <Results
        showResults={showResults}
        score={score}
        totalQuestions={preguntas.length}
        detallesRespuestas={detallesRespuestas}
        paginaActual={paginaActual}
        setPaginaActual={setPaginaActual}
      />
    );
  }

  const preguntaActual = preguntas[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col lg:items-center bg-purple-50">
      {/* Barra de Navegación para Móviles */}
      <div className="block lg:hidden">
        <MobileNav />
      </div>

      {/* // Header del Quiz */}
      <div className="hidden lg:block">
        <HeaderQuiz 
          navClass={"text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"}
          // Boton 1
          showHomeButton = {true} 
          classNameChildrenButton = {"hidden sm:block group text-violet-900  font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"}
          handleLinkChildrenButton = {"/"}
          // Boton 2
          showLoginButton = {true} 
          classNameChildrenButton2 = {
            "hidden sm:block group font-medium py-2 px-4 text-violet-900 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
          }
          handleLinkChildrenButton2={"/login"}
          />
      </div>

      <div className="text-center flex flex-col items-center"> 
        
        <h1 className="text-6xl font-bold lg:mt-24 mb-4"><span className="font-extrabold  text-justify  text-black text-3xl"></span> </h1>
        <p className="text-xl font-bold">¡Sigue las intrucciones!</p>
      </div>

      <div className="max-w-2xl w-full p-6 bg-white shadow-lg rounded-lg mt-10">
          <div className="text-lg text-center  font-medium"> Pregunta {currentQuestion+1} </div>
        <h2 className="text-xl text-justify font-bold mb-4 mt-3">{preguntaActual.texto}</h2>
        
        <p className="mb-4 text-gray-500 italic underline ">
          {preguntaActual.tipo_pregunta === "única"
            ? "Pregunta de respuesta única"
            : "Pregunta de respuesta múltiple (seleccionar todas las correctas)"}
        </p>

        {preguntaActual.imagenes && preguntaActual.imagenes.length > 0 && (
          <div className="flex flex-col items-center mb-4">
            <img
              src={`${API_URL}/images/${preguntaActual.imagenes[0]}`}
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
              ? "bg-violet-500 text-white"
              : "bg-violet-50 hover:bg-violet-200"
              }`}
              >
              <span> {alternativa.id.toUpperCase()}) </span> 
              <span> {alternativa.texto} </span>
            </button>
          ))}
        </div>

        <div className="flex mt-4 justify-end">
          <button
            onClick={handleNext}
            className="text-violet-900 px-4 py-2 rounded-lg hover:text-purple-600"
          >
            {currentQuestion < preguntas.length - 1 ? "Siguiente" : "Finalizar"}
          </button>
        </div>
      </div>
    </div>
  );
};
