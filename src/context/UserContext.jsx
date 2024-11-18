import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUid, setUserUid] = useState();

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        isLoggedIn,
        setIsLoggedIn,
        userUid,
        setUserUid,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
