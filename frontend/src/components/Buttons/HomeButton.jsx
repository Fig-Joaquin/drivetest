import { useNavigate } from "react-router-dom";
import  PropTypes from 'prop-types';

export const HomeButton = (
  {
    classNameChildren,
    handleLinkChildren,
    Text,
  }
) => {

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`${handleLinkChildren}`);
  };

  return (

    <button
      className={classNameChildren}	
      onClick={handleStartQuiz} > 
      <span className=" group-hover:text-purple-600">Volver al inicio</span>
    </button>

    // <button
    // className="hidden sm:block group font-medium py-2 px-4 rounded-lg transition duration-200 text-sm sm:text-base sm:py-2 md:py-2 md:px-4"
    // onClick={handleStartQuiz} > 
    // <span className="text-white group-hover:text-violet-200">Volver al inicio</span>
    // </button>
  )
}

HomeButton.propTypes = {
  classNameChildren: PropTypes.string,
  handleLinkChildren: PropTypes.string,
  Text: PropTypes.string,
};