import Header from "../components/Header";
import Level from "../components/Level";
import Footer from "../components/Footer";
import LevelDescription from "../components/LevelDescription";
import Leaderboard from "../components/Leaderboard";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function App() {
  //TODO: Pierwsze wysunięcie nie działa poprawnie
  const [continent, setContinent] = useState("Europa");
  const [quizType, setQuizType] = useState("capital");

  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);

  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);

  const handleLevelClick = (newContinent, quizNumber) => {
    if (!isFirstInteraction) {
      setIsFirstInteraction(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        const quizTypes = ["flags", "country", "capital"];
        setContinent(newContinent);
        setQuizType(quizTypes[quizNumber - 1]);
        setIsAnimating(false);
      }, 300);
    }
  };

  const { user } = useContext(AuthContext);

  return (
    <div
      className={`font-monts bg-default bg-blue-100 bg-opacity-5 ${
        isLeaderboardVisible ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <Header />
      <br />
      <div
        className={`fixed shadow-xl w-4/12 flex flex-col items-center border-2 border-black rounded-md py-6 px-4 mx-20 mt-10 bg-white transition-transform duration-300 ease-in-out ${
          isFirstInteraction
            ? isAnimating
              ? "-translate-x-[1000px]"
              : "translate-x-0"
            : "-translate-x-[1000px]"
        }`}
      >
        <LevelDescription
          levelName={continent}
          quizType={quizType}
          isLeaderboardVisible={setIsLeaderboardVisible}
        />
      </div>

      <Level
        colorMap="fill-green-500"
        color="bg-green-500"
        levelTitle="Europa"
        onClick={(quizNumber) => handleLevelClick("Europa", quizNumber)}
      />
      <Level
        colorMap="fill-yellow-300"
        color="bg-yellow-300"
        levelTitle="Ameryka Północna"
        onClick={(quizNumber) =>
          handleLevelClick("Ameryka Północna", quizNumber)
        }
      />
      <Level
        colorMap="fill-orange-400"
        color="bg-orange-400"
        levelTitle="Ameryka Południowa"
        onClick={(quizNumber) =>
          handleLevelClick("Ameryka Południowa", quizNumber)
        }
      />
      <Level
        colorMap="fill-orange-600"
        color="bg-orange-600"
        levelTitle="Afryka"
        onClick={(quizNumber) => handleLevelClick("Afryka", quizNumber)}
      />
      <Level
        colorMap="fill-purple-500"
        color="bg-purple-500"
        levelTitle="Azja"
        onClick={(quizNumber) => handleLevelClick("Azja", quizNumber)}
      />
      <Level
        colorMap="fill-blue-300"
        color="bg-blue-300"
        levelTitle="Oceania"
        onClick={(quizNumber) => handleLevelClick("Oceania", quizNumber)}
      />
      <Level
        colorMap="fill-gray-700"
        color="bg-gray-700"
        levelTitle="Świat"
        onClick={(quizNumber) => handleLevelClick("Świat", quizNumber)}
      />
      <Footer />
      {isLeaderboardVisible && (
        <Leaderboard
          continent={continent}
          quizType={quizType}
          setIsLeaderboardVisible={setIsLeaderboardVisible}
        />
      )}
    </div>
  );
}

export default App;
