import { useState, useEffect, React } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Funkcja do rozpoczęcia / zatrzymania timera
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Funkcja do resetowania timera
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // Przekształcenie sekund na format mm:ss
  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const remainingSeconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return (
    <div>
      <h1 onClick={toggleTimer}>{formatTime(seconds)}</h1>
    </div>
  );
}
