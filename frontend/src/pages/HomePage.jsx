
import { useNavigate } from "react-router-dom";
import { MobileNav, Banner} from "../components";
import { HeaderQuiz } from "../components/HeaderQuiz";


export const HomePage = () => {

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-100">
      
      {/* Barra de Navegación para Móviles */}
      <MobileNav />

      {/* Barra de Navegación */}
      {/* // Header del Quiz */}
      
      <HeaderQuiz 
        showLoginButton={true} showHomeButton = {false}
      />
      
      {/* Banner Principal */}
      <Banner />
      
      <div className="flex-grow flex items-center justify-center mb-20">
        <button onClick={handleStartQuiz} className="bg-purple-700  text-white px-6 py-3 rounded-full text-lg hover:bg-purple-600 transition duration-200  animate-bounce ">
          Empezar Test
        </button>
      </div>

      {/* Pie de Página" */}
      <div className="flex items-center justify-center font-sans text-sm bg-gray-100 p-1">
        Aplicación desarrollada para calificar tus conocimientos sobre la conducción.
      </div>
      
    </div>
    
  );
}

