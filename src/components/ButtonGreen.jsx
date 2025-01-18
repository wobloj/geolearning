import React from "react";

export default function ButtonGreen({ onClick, className, children }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`${className} flex items-center bg-white justify-center max-w-64 border-2 border-green-500 font-medium text-green-500 rounded-lg py-2 px-8 text-center mt-6 transition-colors hover:border-green-600 hover:text-green-600 hover:bg-green-100`}
    >
      {children}
    </button>
  );
}
