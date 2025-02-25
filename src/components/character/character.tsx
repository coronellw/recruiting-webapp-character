import { PrimitiveAtom, useAtom } from "jotai"
import { focusAtom } from "jotai-optics"

import AttributesComponent from "../attributes"
import ClassesComponent from "../classes"

import SkillList from "../skill-list"
import SkillCheck from "../skill-check"

import { Character } from "../../types"

import "./character.css"
import { useMemo } from "react"

type CharacterProps = {
  characterAtom: PrimitiveAtom<Character>
}

export default function CharacterComponent({ characterAtom }: CharacterProps) {
  const [character] = useAtom(characterAtom)
  const skillsAtom = focusAtom(characterAtom, (optic) => optic.prop("skills"))
  const attributesAtom = focusAtom(characterAtom, (optic) =>
    optic.prop("attributes")
  )

  const currentLevel = useMemo(
    () =>
      Object.values(character.attributes).reduce(
        (acc, value) => acc + value,
        0
      ),
    [character.attributes]
  )

  const handleDeleteCharacter = () => {
    if (window.confirm(`Are you sure you want to delete ${character.name}?`)) {
      // deleteCharacter(character.name)
      alert(JSON.stringify(character, undefined, 4))
    }
  }

  return (
    <div className="character">
      <h1>
        Character-[{character.name}] ({currentLevel})
      </h1>

      <div className="stats">
        <AttributesComponent attributesAtom={attributesAtom} />

        <ClassesComponent attributes={character.attributes} />

        <SkillCheck skillAtom={skillsAtom} />
      </div>
      <SkillList attributes={character.attributes} skillsAtom={skillsAtom} />

      <div className="character__actions">
        <button className="btn btn--danger" onClick={handleDeleteCharacter}>
          DELETE
        </button>
      </div>
    </div>
  )
}
