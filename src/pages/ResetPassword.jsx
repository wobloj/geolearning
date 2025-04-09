import React, { useState } from "react";
import Back from "../components/Back";
import { resetPassword } from "../firebase/services";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    try {
      await resetPassword(email);
      setStatus("Wysłano e-mail do resetowania hasła. Sprawdź swoją skrzynkę.");
    } catch (error) {
      setStatus("Podany adres e-mail nie istnieje.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-monts bg-default bg-blue-100 bg-opacity-5 h-screen">
      <Back to={"/login"} />
      <h2 className="text-3xl font-semibold">Przypomnienie hasła</h2>
      <p className="mt-4 w-[25%] text-center">
        Wpisz swój adres email. Na podany przez ciebie adres wyślemy link z
        możliwością resetu hasła.
      </p>
      <div className="flex flex-col justify-center items-center mb-24">
        <input
          className="mt-24 text-center border-2 rounded-md border-blue-400 w-96 h-10 transition-colors focus:outline-none focus:border-blue-600"
          placeholder="address@email.com"
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
        />
        <input
          className="cursor-pointer py-3 px-8 mt-10 bg-white border-2 border-blue-400 rounded-md transition-colors font-medium hover:bg-blue-100"
          type="submit"
          value="Resetuj hasło"
          onClick={handleSubmit}
        />
      </div>
      <p>{status}</p>
    </div>
  );
}
