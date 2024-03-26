import React from "react";

export default function ProgressBar() {
  return (
    <div className="w-screen h-2 absolute top-0 left-0 bg-gray-300">
      <div className="bg-green-400 h-full" style={{ width: "50%" }}></div>
    </div>
  );
}
