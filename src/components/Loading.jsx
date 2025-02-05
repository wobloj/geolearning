import React from "react";

export default function Loading() {
  return (
    <>
      <div className="  h-screen w-full gap-3 flex flex-row justify-center items-center bg-default font-bold text-4xl font-monts">
        <div className=" text-blue-500 animate-bounce animate-delay-0">L</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[50ms]">
          O
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-100">A</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[150ms]">
          D
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-200">I</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[250ms]">
          N
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-300">G</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[350ms]">
          .
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-[400ms]">
          .
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-[450ms]">
          .
        </div>
      </div>
    </>
  );
}
