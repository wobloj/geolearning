import React from "react";

export default function Loading() {
  return (
    <>
      <div className="  h-screen w-full gap-3 flex flex-row justify-center items-center bg-default font-bold text-4xl font-monts">
        <div className=" text-blue-500 animate-bounce animate-delay-0">Ł</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[50ms]">
          A
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-100">D</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[150ms]">
          O
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-200">W</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[250ms]">
          A
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-300">N</div>
        <div className=" text-blue-500 animate-bounce animate-delay-[350ms]">
          I
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-[400ms]">
          E
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-[450ms]">
          .
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-[500ms]">
          .
        </div>
        <div className=" text-blue-500 animate-bounce animate-delay-[550ms]">
          .
        </div>
      </div>
    </>
  );
}
