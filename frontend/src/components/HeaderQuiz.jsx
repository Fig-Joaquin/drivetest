import { HomeButton } from "./Buttons/HomeButton";
import { LoginButton } from "./Buttons/LoginButton";
import PropTypes from "prop-types";

export const HeaderQuiz = ({ showHomeButton = false, showLoginButton = true }) => {
  return (
    <header>
      <nav className="text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet-600 text-white uppercase p-3 flex justify-between items-center w-full">
        {/* Espaciador fijo para el HomeButton */}
        <div className="w-36">
          {showHomeButton && <HomeButton />}
        </div>

        {/* Título centrado */}
        <span className="text-lg md:text-xl lg:text-xl flex-grow text-center">
          Examen teórico de conducción
        </span>

        {/* Espaciador fijo para el LoginButton */}
        <div className="w-32">
          {showLoginButton && <LoginButton />}
        </div>
      </nav>
    </header>
  );
};

HeaderQuiz.propTypes = {
  showHomeButton: PropTypes.bool,
  showLoginButton: PropTypes.bool,
};
