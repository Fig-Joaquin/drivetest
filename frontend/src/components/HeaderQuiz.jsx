import { HomeButton } from "./HomeButton";
import { LoginButton } from "./LoginButton";
import PropTypes from "prop-types";

export const HeaderQuiz = ({ showHomeButton = false, showLoginButton = true }) => {
  return (
    <header>
      <nav className="text-2xl fixed top-0 z-50 left-0 font-extrabold text-center bg-violet-600 text-white uppercase p-4 flex justify-between items-center w-full">
        {showHomeButton && <HomeButton />}
        <span className="text-lg md:text-xl lg:text-2xl">
          Examen teórico de conducción
        </span>
        {showLoginButton && <LoginButton />}
      </nav>
    </header>
  );
};

HeaderQuiz.propTypes = {
  showHomeButton: PropTypes.bool,
  showLoginButton: PropTypes.bool,
};
