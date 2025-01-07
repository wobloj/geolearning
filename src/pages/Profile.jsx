import React, { useState } from "react";
import Header from "../components/Header";

export default function Profile() {
  const [titlePanel, setTitlePanel] = useState("Profil");

  return (
    <div className="bg-default font-monts min-h-screen">
      <Header />
      <div className="flex flex-row justify-start gap-10 mt-10 h-[40rem]">
        <div className="border-2 border-blue-500 rounded-md ml-60 h-full w-96 bg-white text-center">
          <p className="font-semibold pt-4 pb-8 text-xl">Panel</p>
          <div className="flex flex-col items-center gap-3">
            <p
              onClick={() => setTitlePanel("Profil")}
              className="text-l cursor-pointer hover:text-blue-600"
            >
              Profil
            </p>
            <p
              onClick={() => setTitlePanel("Nauka")}
              className="text-l cursor-pointer hover:text-blue-600"
            >
              Nauka
            </p>
          </div>
        </div>
        <div className="border-2 border-blue-500 px-8 py-4 rounded-md mr-60 h-full w-full bg-white">
          <p className="text-center font-semibold text-xl mb-10">
            {titlePanel}
          </p>
          <div className="flex flex-col gap-5">
            <div>
              <p>Nazwa użytkownika:</p>
              <p className="ml-2 font-bold">username</p>
            </div>
            <div>
              <p>Adres email:</p>
              <p className="ml-2 font-bold">us******@gmail.com</p>
            </div>
            <div>
              <p>Hasło:</p>
              <p className="ml-2 font-bold">******</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
