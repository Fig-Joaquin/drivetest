import { HomeButton } from "./Buttons/HomeButton";
import { LoginButton } from "./Buttons/LoginButton";
import PropTypes from "prop-types";

export const HeaderQuiz = ({ 
  navClass, 
  // Botón 1 homeButton
  classNameChildrenButton,
  handleLinkChildrenButton,
  // Botón 2 loginButton
  classNameChildrenButton2, 
  handleLinkChildrenButton2, 
  showHomeButton = false, 
  showLoginButton = true 
}) => {

  return (
    <header>
      <nav className={navClass}>
        {/* Botón 1*/}
        <div className="w-36">
          {showHomeButton && 
          <HomeButton 
          classNameChildren = { classNameChildrenButton }
          handleLinkChildren = { handleLinkChildrenButton }
          />}
        </div>

        {/* Título centrado */}
        <span className="text-lg md:text-xl lg:text-xl flex-grow text-center">
          Examen teórico de conducción
        </span>

        {/* Botón 2*/}
        <div className="w-32">
          {showLoginButton && 
            <LoginButton 
              classNameChildren2 = { classNameChildrenButton2 }
              handleLinkChildren2 = {handleLinkChildrenButton2 }
          />}
        </div>
      </nav>
    </header>
  );
};

HeaderQuiz.propTypes = {
  navClass: PropTypes.string,
  classNameChildrenButton: PropTypes.string,
  handleLinkChildrenButton: PropTypes.string,
  classNameChildrenButton2: PropTypes.string,
  handleLinkChildrenButton2: PropTypes.string,
  showHomeButton: PropTypes.bool,
  showLoginButton: PropTypes.bool,
};
