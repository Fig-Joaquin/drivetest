
import { useNavigate } from "react-router-dom";

export const HomePage = () => {

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra de Navegación */}
      <nav className="bg-purple-50 p-4 flex justify-between items-center">
    
        <div className="text-2xl font-extrabold bg-purple-50 animate-pulse text-purple-800 uppercase">Test para la conducción</div>
        <button className="bg-purple-800 text-white font-medium py-2  px-4 rounded-lg hover:bg-purple-600 transition duration-200">
          Iniciar Sesión
        </button>

      </nav>

      {/* Banner Principal */}
      <header className="flex flex-col items-center justify-center flex-grow">
        <div className="text-center flex flex-col items-center"> 
          <h1 className="text-4xl font-bold mb-4">¡Comienza la <span className="font-extrabold text-purple-800 text-4xl"> Prueba de Conducir </span> con nosotros!</h1>
          <p className="text-lg">Prepárate para tu licencia de conducir con nuestras pruebas con todas las preguntas del examen de conducir.</p>
        </div>
      </header>
      
      <div className="flex-grow flex items-center justify-center">
        <button onClick={handleStartQuiz} className="bg-purple-800  text-white px-6 py-3 rounded text-lg hover:bg-purple-500 transition duration-200 animate-bounce ">
          Empezar Test
        </button>
      </div>

      {/* Botón "Iniciar Quiz" */}
      <div className="flex items-center justify-center bg-purple-50 p-4">
        Aplicación desarrollada para calificar tus conocimientos sobre la conducción.
      </div>
      
    </div>
    
  );
}

