import Header from "../components/Header";
import Level from "../components/Level";
import Footer from "../components/Footer";

function App() {
  return (
    <div className="font-monts bg-default bg-blue-100 bg-opacity-5">
      <Header />
      <br />
      <Level
        colorMap="fill-green-500"
        color="bg-green-500"
        levelTitle="Europa"
      />
      <Level
        colorMap="fill-yellow-300"
        color="bg-yellow-300"
        levelTitle="Ameryka Północna"
      />
      <Level
        colorMap="fill-orange-400"
        color="bg-orange-400"
        levelTitle="Ameryka Południowa"
      />
      <Level
        colorMap="fill-orange-600"
        color="bg-orange-600"
        levelTitle="Afryka"
      />
      <Level
        colorMap="fill-purple-500"
        color="bg-purple-500"
        levelTitle="Azja"
      />
      <Level
        colorMap="fill-blue-300"
        color="bg-blue-300"
        levelTitle="Oceania"
      />
      <Level colorMap="fill-gray-700" color="bg-gray-700" levelTitle="Świat" />
      <Footer />
    </div>
  );
}

export default App;
