import React from "react";

export default function Loading() {
  return (
    <>
      <div className="  h-screen w-full gap-2 flex justify-center items-center">
        <div className=" bg-blue-500 rounded-full w-10 h-10 animate-bounce"></div>
        <div className=" bg-blue-500 rounded-full w-10 h-10 animate-bounce"></div>
        <div className=" bg-blue-500 rounded-full w-10 h-10 animate-bounce"></div>
      </div>
    </>
  );
}
