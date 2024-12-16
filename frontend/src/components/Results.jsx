import PropTypes from "prop-types";
import { HeaderQuiz } from "./HeaderQuiz";

export const Results = ({
  showResults,
  score,
  totalQuestions,
  detallesRespuestas,
  paginaActual,
  setPaginaActual,
}) => {
  if (!showResults) {
    return null; // Si no hay resultados para mostrar, no renderizar nada
  }

  const respuestasIncorrectas = detallesRespuestas.filter((detalle) => !detalle.esCorrecta);
  const respuestasPorPagina = 2;

  // Calcular las respuestas incorrectas de la página actual
  const inicio = paginaActual * respuestasPorPagina;
  const fin = inicio + respuestasPorPagina;
  const respuestasVisibles = respuestasIncorrectas.slice(inicio, fin);

  return (
    <div className="min-h-screen flex flex-col mt-4 items-center bg-violet-50">

      {/* // Header del Quiz */}
      <HeaderQuiz 
        showLoginButton={true} 
        showHomeButton = {true} 
      />      
      <div className="max-w-3xl w-full p-6 bg-violet shadow-lg rounded-lg mt-20">
        <h2 className="text-2xl font-bold mb-4">Resultados del Test</h2>
        <p className="text-lg">
          Tu puntuación es: <strong>{score}/{totalQuestions}</strong>
        </p>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Respuestas Incorrectas:</h3>
          {respuestasVisibles.map((detalle) => (
            <div key={detalle} className="p-4 mb-4 bg-violet-100 rounded-lg shadow-md">
              <h4 className="font-bold mb-2">{detalle.pregunta}</h4>
              <ul>
                {detalle.alternativas.map((alt) => {
                  const isCorrect = detalle.respuestasCorrectas.includes(alt.id);
                  const isSelected = detalle.respuestasSeleccionadas.includes(alt.id);
                  const missedSelection =
                  isCorrect && !isSelected &&
                  detalle.respuestasCorrectas.length > 1;

                  return (
                    <li key={alt.id} className="flex items-center gap-2 max-w-1xl">
                      {alt.id})
                      <span className={isCorrect ? "underline" : ""}>{alt.texto}</span>

                      <div className="ml-2 flex gap-1 text-xs font-semibold">
                        {isCorrect && (
                          <span className="bg-green-200 text-green-900 px-2 py-1 rounded-md">
                            Correcta
                          </span>
                        )}
                        {isSelected && (
                          <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded-md">
                            Seleccionada
                          </span>
                        )}
                        {missedSelection && (
                          <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-md">
                            Faltó seleccionar
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {detalle.correccion && (
                <div className="mt-2 text-sm text-gray-700 justify-center">
                  <strong className="font-bold">Correcciones:</strong>
                  <ul className="list-outside list-disc pl-4">
                    {detalle.respuestasCorrectas.map((respCorrecta) => {
                      const alternativaCorrecta = detalle.alternativas.find(
                        (alt) => alt.id === respCorrecta
                      );
                      return alternativaCorrecta?.correccion ? (
                        <li key={respCorrecta}>{alternativaCorrecta.correccion}</li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navegación entre páginas */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 0))}
            className={`text-violet-700  px-3 py-1 rounded-lg border-2 border-violet-800 
              ${
                paginaActual > 0
                  ? "hover:bg-purple-50"
                  : "opacity-35"
              }`}            disabled={paginaActual === 0}
          >
            Anterior
          </button>

          <button
            
            onClick={() =>
              setPaginaActual((prev) =>
                prev < Math.ceil(respuestasIncorrectas.length / respuestasPorPagina) - 1
                  ? prev + 1
                  : prev
              )
            }
            className={`text-violet-700  px-3 py-1 rounded-lg border-2 border-violet-800 
                    ${
                        paginaActual < Math.ceil(respuestasIncorrectas.length / respuestasPorPagina) - 1
                          ? "hover:bg-violet-50"
                          : "opacity-35"
                    }`}
            disabled={paginaActual >= Math.ceil(respuestasIncorrectas.length / respuestasPorPagina) - 1}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

// Validación de props
Results.propTypes = {
  showResults: PropTypes.bool.isRequired,
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  detallesRespuestas: PropTypes.arrayOf(
    PropTypes.shape({
      pregunta: PropTypes.string.isRequired,
      alternativas: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          texto: PropTypes.string.isRequired,
          correccion: PropTypes.string,
        })
      ).isRequired,
      respuestasSeleccionadas: PropTypes.arrayOf(PropTypes.string).isRequired,
      respuestasCorrectas: PropTypes.arrayOf(PropTypes.string).isRequired,
      esCorrecta: PropTypes.bool.isRequired,
    })
  ).isRequired,
  paginaActual: PropTypes.number.isRequired,
  setPaginaActual: PropTypes.func.isRequired,

};
