import React from "react";

export default function ButtonBlue({ onClick, style, children }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`flex items-center justify-center flex-1 max-w-64 border-2 border-blue-400 font-medium text-blue-500 rounded-lg py-2 px-8 text-center transition-colors hover:border-blue-700 hover:text-blue-00 bg-backgroundlight hover:bg-blue-100 dark:hover:bg-blue-950 ${style}`}
    >
      {children}
    </button>
  );
}
