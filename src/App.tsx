import { useState } from "react";
import "./App.css";
import Character from "./components/character";
import { Attributes } from "./types";
import { ATTRIBUTE_LIST } from "./consts";

function App() {
  const [characters, setCharacters] = useState<Attributes[]>([]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        {characters.map((character, index) => (
          <Character key={index} attributes={character} name={""+index}/>
        ))}
        <button
          onClick={() => {
            setCharacters((prev) => [
              ...prev,
              ATTRIBUTE_LIST.reduce(
                (acc, attribute) => ({ ...acc, [attribute]: 10 }),
                {} as Attributes
              ),
            ]);
          }}
        >
          Add Another Character
        </button>
      </section>
    </div>
  );
}

export default App;
