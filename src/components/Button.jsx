import React from "react";

export default function Button({ children }) {
  return (
    <button
      type="submit"
      className="py-3 px-8 bg-white border-2 border-blue-400 transition-colors font-medium hover:bg-blue-100"
    >
      {children}
    </button>
  );
}
