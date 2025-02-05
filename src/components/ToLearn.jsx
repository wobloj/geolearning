import React from "react";

export default function ToLearn({ toLearn }) {
  return (
    <div className="grid grid-cols-3 gap-24">
      {toLearn.map((data, index) => {
        return (
          <div
            className="flex items-center justify-center bg-blue-400 h-24 cursor-pointer"
            key={index}
          >
            <p className="text-xl">{data}</p>
          </div>
        );
      })}
    </div>
  );
}
