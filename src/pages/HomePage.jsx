import Header from "../components/Header";
import Level from "../components/Level";
import Footer from "../components/Footer";
import LevelDescription from "../components/LevelDescription";
import Leaderboard from "../components/Leaderboard";
import { useState } from "react";

function App() {
  const [continent, setContinent] = useState("");
  const [quizType, setQuizType] = useState("");
  const [level, setLevel] = useState("");

  const [isAnimating, setIsAnimating] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(false);

  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);

  const handleLevelClick = (newContinent, level, quizNumber) => {
    const quizTypes = ["flags", "country", "capital"];

    if (!isFirstInteraction) {
      setIsFirstInteraction(true);
      setContinent(newContinent);
      setQuizType(quizTypes[quizNumber - 1]);
      setLevel(level);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setContinent(newContinent);
        setQuizType(quizTypes[quizNumber - 1]);
        setLevel(level);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div
      className={`${
        isLeaderboardVisible ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <Header />
      <br />
      <div
        className={`fixed shadow-xl w-4/12 flex flex-col items-center border-2 border-black dark:border-blue-400 rounded-md py-6 px-4 mx-20 mt-10 bg-backgroundlight dark:bg-backgrounddark transition-all duration-300 ease-in-out ${
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
        onClick={(quizNumber) =>
          handleLevelClick("Europa", "europe", quizNumber)
        }
      />
      <Level
        colorMap="fill-yellow-300"
        color="bg-yellow-300"
        levelTitle="Ameryka Północna"
        onClick={(quizNumber) =>
          handleLevelClick("Ameryka Północna", "north_america", quizNumber)
        }
      />
      <Level
        colorMap="fill-orange-400"
        color="bg-orange-400"
        levelTitle="Ameryka Południowa"
        onClick={(quizNumber) =>
          handleLevelClick("Ameryka Południowa", "south_america", quizNumber)
        }
      />
      <Level
        colorMap="fill-orange-600"
        color="bg-orange-600"
        levelTitle="Afryka"
        onClick={(quizNumber) =>
          handleLevelClick("Afryka", "africa", quizNumber)
        }
      />
      <Level
        colorMap="fill-purple-500"
        color="bg-purple-500"
        levelTitle="Azja"
        onClick={(quizNumber) => handleLevelClick("Azja", "asia", quizNumber)}
      />
      <Level
        colorMap="fill-blue-300"
        color="bg-blue-300"
        levelTitle="Oceania"
        onClick={(quizNumber) =>
          handleLevelClick("Oceania", "oceania", quizNumber)
        }
      />
      <Level
        colorMap="fill-pink-800"
        color="bg-pink-800"
        levelTitle="Świat"
        onClick={(quizNumber) => handleLevelClick("Świat", "world", quizNumber)}
      />
      <Footer />
      {isLeaderboardVisible && (
        <Leaderboard
          continent={continent}
          region={level}
          quizType={quizType}
          setIsLeaderboardVisible={setIsLeaderboardVisible}
        />
      )}
    </div>
  );
}

export default App;
