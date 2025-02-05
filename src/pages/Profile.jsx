import { React, useEffect, useState } from "react";
import { getUserData, getToLearn } from "../firebase/services";

import avatar from "../assets/avatar-default.png";
import Header from "../components/Header";
import ToLearn from "../components/ToLearn";
import ProfileDetails from "../components/ProfileDetails";

export default function Profile() {
  const [titlePanel, setTitlePanel] = useState("Profil");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileTab, setProfileTab] = useState(null);
  const [toLearn, setToLearn] = useState([]);

  const setUserData = async () => {
    const userData = await getUserData();
    setUsername(userData.username);
    setEmail(userData.email);
  };

  const fetchToLearn = async () => {
    const toLearnData = await getToLearn();
    setToLearn(toLearnData);
  };

  useEffect(() => {
    const fetchData = async () => {
      await setUserData();
      await fetchToLearn();
      setProfileTab(
        <ProfileDetails username={username} email={email} avatar={avatar} />
      );
    };
    fetchData();
  }, [username, email]);

  return (
    <div className="bg-default font-monts min-h-screen">
      <Header />
      <div className="flex flex-row justify-start gap-10 mt-10 h-[40rem]">
        <div className="border-2 border-blue-500 rounded-md ml-60 h-full w-96 bg-white text-center">
          <p className="font-semibold pt-4 pb-8 text-xl">Panel</p>
          <div className="flex flex-col items-center gap-3">
            <p
              onClick={() => {
                setTitlePanel("Profil");
                setProfileTab(
                  <ProfileDetails
                    username={username}
                    email={email}
                    avatar={avatar}
                  />
                );
              }}
              className="text-l cursor-pointer hover:text-blue-600"
            >
              Profil
            </p>
            <p
              onClick={() => {
                setTitlePanel("Nauka");
                setProfileTab(<ToLearn toLearn={toLearn} />);
              }}
              className="text-l cursor-pointer hover:text-blue-600"
            >
              Nauka
            </p>
            <p
              onClick={() => {
                setTitlePanel("Punkty");
              }}
              className="text-l cursor-pointer hover:text-blue-600"
            >
              Punkty
            </p>
          </div>
        </div>
        <div className="border-2 border-blue-500 px-8 py-4 rounded-md mr-60 h-full w-full bg-white ">
          <p className="text-center font-semibold text-xl mb-10">
            {titlePanel}
          </p>
          {profileTab}
        </div>
      </div>
    </div>
  );
}
