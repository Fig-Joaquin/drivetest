import { useNavigate } from "react-router-dom";

export const HomeButton = () => {

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/');
  };

  return (

    <button
      className="hidden sm:block group font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
      onClick={handleStartQuiz}
      > <span className="text-white group-hover:text-violet-200">Volver al inicio</span>
  </button>

  )
}
