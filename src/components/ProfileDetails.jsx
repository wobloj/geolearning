import React from "react";

export default function ProfileDetails({ username, email, avatar }) {
  return (
    <>
      <div className="flex flex-col gap-5 relative">
        <div>
          <p>Nazwa użytkownika:</p>
          <p className="ml-2 font-bold">{username}</p>
        </div>
        <div>
          <p>Adres email:</p>
          <p className="ml-2 font-bold">{email}</p>
        </div>
        <div>
          <p>Hasło:</p>
          <p className="ml-2 font-bold">******</p>
        </div>
        <img
          className="absolute size-24 right-0 top-0 border-2 border-blue-400 rounded-md cursor-pointer hover:opacity-50"
          src={avatar}
          alt="avatar"
        />
      </div>
    </>
  );
}
