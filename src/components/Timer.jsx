import { useState, useEffect } from "react";

export default function Timer({ isStarted, onTimeUpdate }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isStarted) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newTime = prevSeconds + 1;
          if (onTimeUpdate) onTimeUpdate(newTime); // Wywołanie callbacka
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isStarted, onTimeUpdate]);

  const formatTime = (secs) => {
    const minutes = String(Math.floor(secs / 60)).padStart(2, "0");
    const remainingSeconds = String(secs % 60).padStart(2, "0");
    return `${minutes}:${remainingSeconds}`;
  };

  return <h1>{formatTime(seconds)}</h1>;
}
