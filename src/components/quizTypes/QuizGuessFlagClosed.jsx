import React from "react";

export default function QuizGuessFlagClosed() {
  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-4xl pt-14 pb-14">Co to za kraj?</p>
      <img
        className="lg:w-3/4 sm:w-3/4"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/640px-Flag_of_Poland.svg.png"
        alt="flaga"
      />
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:gap-[5rem] sm:gap-1 font-semibold text-center text-xl mt-20">
        <div className="flex items-center justify-center border-2 border-black h-[6rem] lg:w-[15rem] sm:w-screen select-none bg-white cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500">
          Polska
        </div>
        <div className="flex items-center justify-center border-2 border-black h-[6rem] w-[15rem] select-none bg-white cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500">
          Rosja
        </div>
        <div className="flex items-center justify-center border-2 border-black h-[6rem] w-[15rem] select-none bg-white cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500">
          Ukraina
        </div>
        <div className="flex items-center justify-center border-2 border-black h-[6rem] w-[15rem] select-none bg-white cursor-pointer hover:bg-blue-50 hover:border-blue-500 hover:text-blue-500">
          Brazylia
        </div>
      </div>
    </div>
  );
}
