import React from "react";
import PropTypes from "prop-types";

export const CustomButton = ({ classSpan, classNameChildren, onClick, text, type = "button", variant = "primary", disabled = false }) => {
  const baseStyles =
    "px-4 py-2 rounded text-white font-semibold transition focus:outline-none focus:ring";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300",
    danger: "bg-red-500 hover:bg-red-600 focus:ring-red-300",
  };

  return (
    <button
      type={type}
      className={`${classNameChildren}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`${classSpan}`}> {text} </span>
    </button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  disabled: PropTypes.bool,
  classSpan: PropTypes.string,
};
