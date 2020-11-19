import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

function Button({ size = "md", disabled, children, ...rest }) {
  const btnClass = `btn btn--${size}`;
  return (
    <span
      className={`${rest.className || ""} ${
        disabled ? "btn--cursor-not-allowed" : ""
      }`}
    >
      <button
        {...rest}
        type="button"
        className={`${btnClass} ${disabled ? "btn--disabled" : ""}`}
      >
        {children}
      </button>
    </span>
  );
}

Button.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
};

export default Button;
