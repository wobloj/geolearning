import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(localStorage.theme) || "light";
  const colorTheme = darkMode === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(darkMode);
    localStorage.setItem("theme", darkMode);
  }, [darkMode, colorTheme]);

  return [darkMode, setDarkMode];
}
