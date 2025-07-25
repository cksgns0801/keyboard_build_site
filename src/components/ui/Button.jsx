// src/components/ui/Button.jsx
import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
