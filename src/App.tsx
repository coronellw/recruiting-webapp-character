import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Character from "./components/character";
import { Attributes } from "./types";
import { ATTRIBUTE_LIST } from "./consts";

function App() {
  const [characters, setCharacters] = useState<Record<string, Attributes>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const saveData = useCallback(
    async (newCharacters?: Record<string, Attributes>) => {
      try {
        // setLoading(true);

        setError("");
        const response = await fetch(
          "https://recruiting.verylongdomaintotestwith.ca/api/demo/character",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              characters: newCharacters || characters,
            }),
          }
        );
        if (response.ok) {
          console.log("Character saved successfully");
        } else {
          setError("Error saving character");
        }
        // setLoading(false);
      } catch (error) {
        setError("Error saving character");
      }
    },
    [characters]
  );

  useEffect(() => {
    fetchSavedData();
  }, []);

  // code to recover character from the server
  async function fetchSavedData() {
    try {
      setLoading(true);
      const response = await fetch(
        "https://recruiting.verylongdomaintotestwith.ca/api/demo/character"
      );
      const data = await response.json();
      setCharacters(data?.body?.characters || {});
      setLoading(false);
    } catch (error) {
      setError("Error recovering character");
    }
  }

  const handleNewCharacter = () => {
    const newName = prompt("Please provide a name for this character");

    if (!newName) {
      alert("A name is required!");
      return;
    }

    setCharacters((prev) => ({
      ...prev,
      [newName]: ATTRIBUTE_LIST.reduce(
        (acc, attribute) => ({ ...acc, [attribute]: 10 }),
        {} as Attributes
      ),
    }));
  };

  const handleDeleteCharacter = useCallback(
    (name: string) => {
      setCharacters((prev) => {
        const newCharacters = { ...prev };
        delete newCharacters[name];

        console.log(newCharacters);
        saveData(newCharacters);
        return newCharacters;
      });
    },
    [saveData]
  );

  const handleUpdateCharacter = useCallback(
    (name: string, attributes: Attributes) => {
      setCharacters((prev) => ({
        ...prev,
        [name]: attributes,
      }));
    },
    []
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="actions">
        <button className="btn btn--success" onClick={handleNewCharacter}>
          Add Another Character
        </button>
        <button className="btn btn--success" onClick={() => saveData()}>
          Save All characters
        </button>
      </section>
      {loading || error ? (
        <span className="message">
          {loading ? (
            <>Loading... please wait</>
          ) : (
            <>{JSON.stringify(error, undefined, 4)}</>
          )}
        </span>
      ) : (
        <section className="App-section">
          {Object.entries(characters).map(
            ([characterName, characterAttribute], index) => (
              <Character
                key={index}
                name={characterName}
                attributes={characterAttribute}
                updateCharacter={handleUpdateCharacter}
                deleteCharacter={handleDeleteCharacter}
              />
            )
          )}
        </section>
      )}
    </div>
  );
}

export default App;
