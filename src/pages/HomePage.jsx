import Header from "../components/Header";
import Level from "../components/Level";
function App() {
  return (
    <div className="font-monts bg-default bg-fixed bg-blue-100 bg-opacity-50">
      <Header />
      <br />
      <Level color="bg-green-500" levelTitle="Europa" />
      <Level color="bg-yellow-500" levelTitle="Ameryka" />
      <Level color="bg-purple-500" levelTitle="Azja" />
    </div>
  );
}

export default App;
