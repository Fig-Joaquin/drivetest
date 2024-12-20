
import { useNavigate } from "react-router-dom";
import { HeaderQuiz } from "../components/HeaderQuiz";
import { MobileNav, Banner} from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const HomePage = () => {

  const navigate = useNavigate();

  const { authenticated } = useContext(AuthContext); // Obtener estado de autenticación

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-100">
      
      {/* Barra de Navegación para Móviles */}
      <div className="block lg:hidden">
        <MobileNav />
      </div>

      {/* Barra de Navegación */}
      {/* // Header del Quiz */}
      
      <div className="hidden lg:block">
        <HeaderQuiz
          navClass={"text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet text-purple-900 uppercase p-3 flex justify-between items-center w-full"}
          // Boton 1
          showHomeButton={false}
          // Boton2
          showLoginButton={true}
          classNameChildrenButton2={
            "hidden sm:block group font-medium py-2 px-4 text-violet-900 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
          }
          textChildrenButton2={authenticated ? "Ver Perfil" : "Iniciar Sesión"}
          handleLinkChildrenButton2={authenticated ? "/perfil" : "/login"}
        />
      </div>
      
      {/* Banner Principal */}
      <Banner />
      
      <div className="flex-grow flex items-center justify-center mb-20">
        <button onClick={handleStartQuiz} className="bg-purple-800  text-white px-6 py-3 rounded-full text-lg hover:bg-purple-600 transition duration-200  animate-bounce ">
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

