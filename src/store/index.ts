import { atom } from "jotai"
import { focusAtom } from "jotai-optics"
import { atomWithStorage, splitAtom } from "jotai/utils"

import { Character, Attributes } from "../types"

type InitialState = {
  characters: Character[]
}

export const GlobalStateAtom = atomWithStorage<InitialState>("initial-state", {
  characters: [],
})

export const charactersStateAtom = focusAtom(GlobalStateAtom, (optic) =>
  optic.prop("characters")
)

export const charactersAtom = splitAtom(charactersStateAtom)

export const updateCharacterAtom = atom(
  null,
  (get, set, name: string, attributes: Attributes) => {
    if (name === "" || Object.values(attributes)?.some((value) => value < 0)) {
      console.log("Invalid character")
      return
    }

    const characters = get(charactersAtom)
    const newCharacters = { ...characters, [name]: attributes }
    return newCharacters
  }
)

export const deleteCharacterAtom = atom(null, (get, set, name: string) => {
  const characters = get(charactersAtom)
  const newCharacters = { ...characters }
  delete newCharacters[name]
  return newCharacters
})

export const modifierPointsPerAttributesAtom = atom((get, name: string) => {
  const attributes = get(charactersAtom)[name]
  return Object.keys(attributes).reduce(
    (acc, attribute) => ({
      ...acc,
      [attribute]: Math.floor(attributes[attribute] / 2) - 5,
    }),
    {} as Attributes
  )
})
