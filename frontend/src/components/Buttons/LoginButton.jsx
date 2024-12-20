import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

export const LoginButton = ({textChildren2, classNameChildren2, handleLinkChildren2}) => {
  
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`${handleLinkChildren2}`);
  }; 

  return (
      <button 
        onClick={handleLogin}
        className={`${classNameChildren2}`}>
      <span 
        className="group-hover:text-purple-600"
        >{textChildren2}
        </span>

      </button>
  )
}

LoginButton.propTypes = {
  classNameChildren2: PropTypes.string,
  handleLinkChildren2: PropTypes.string,
  textChildren2: PropTypes.string,
};
