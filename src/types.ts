import { SKILL_LIST } from "./consts";

export type Attributes = {
  Strength: number
  Dexterity: number
  Constitution: number
  Intelligence: number
  Wisdom: number
  Charisma: number
}

export type Class = "Barbarian" | "Wizard" | "Bard"

export type Skill = { name: string; attributeModifier: string; value: number }

export type Character = { name: string; attributes: Attributes, skills: Record<string, number> }
