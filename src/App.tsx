import Character from "./components/character"
import { useAtom, useSetAtom } from "jotai"
import { charactersAtom, GlobalStateAtom } from "./store"

import "./App.css"
import { useCallback, useEffect, useState } from "react"

function App() {
  const [characters, setCharacters] = useAtom(charactersAtom)
  const setGlobalState = useSetAtom(GlobalStateAtom)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleNewCharacter = () => {
    const newName = prompt("Please provide a name for this character")

    if (!newName) {
      alert("A name is required!")
      return
    }
    setGlobalState((prev)=> {
      return {
        ...prev,
        characters: [
          ...prev.characters,
          {
            name: newName,
            attributes: {
              Strength: 10,
              Dexterity: 10,
              Constitution: 10,
              Intelligence: 10,
              Wisdom: 10,
              Charisma: 10,
            },
            skills: {},
          },
        ],
      }
    })
  }

  const saveCharacters = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://recruiting.verylongdomaintotestwith.ca/api/demo/character",
        {
          method: "POST",
          body: JSON.stringify(characters),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )

      if (!response.ok) {
        setLoading(false)
        throw new Error("Failed to save characters")
      }
      setLoading(false)
    } catch (error) {
      console.error("Error:", error)
      setError(error)
      setLoading(false)
    }
  }

  // code to recover character from the server
  const loadSavedCharacters = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://recruiting.verylongdomaintotestwith.ca/api/demo/character"
      )
      const data = await response.json()
      setCharacters(data?.body?.characters || {})
      setLoading(false)
    } catch (error) {
      setError("Error recovering character")
    }
  }, [setCharacters])

  useEffect(() => {
    loadSavedCharacters()
  }, [loadSavedCharacters])

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="actions">
        <button className="btn btn--success" onClick={handleNewCharacter}>
          Add Another Character
        </button>
        <button className="btn btn--success" onClick={saveCharacters}>
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
        <section className="characters">
          {characters.map((characterAtom, index) => (
            <Character key={index} characterAtom={characterAtom} />
          ))}
        </section>
      )}
    </div>
  )
}

export default App
