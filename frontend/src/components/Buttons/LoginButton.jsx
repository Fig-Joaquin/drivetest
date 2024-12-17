import { useNavigate } from "react-router-dom";

export const LoginButton = () => {
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }; 

  return (
      <button 
        onClick={handleLogin}
        className="hidden sm:block group font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4">
      <span 
        className="  group-hover:text-violet-200"
        >Iniciar Sesión
        </span>

      </button>
  )
}
