import React from "react";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center h-32 gap-4 font-light dark:text-white">
      <div>Wszelkie prawa zastrzeżone ©</div>
      <span>{date}</span>
    </footer>
  );
}
