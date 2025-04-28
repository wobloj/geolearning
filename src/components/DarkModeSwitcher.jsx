import React, { useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function DarkModeSwitcher() {
  const [darkMode, setDarkMode] = useDarkMode(); // Use the corrected hook
  const [isDarkMode, setIsDarkMode] = useState(darkMode === "dark");

  const toggleDarkMode = (checked) => {
    setDarkMode(checked ? "dark" : "light"); // Toggle between "dark" and "light"
    setIsDarkMode(checked);
  };

  return (
    <>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={24}
      />
    </>
  );
}
