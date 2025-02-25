import { useMemo, useState } from "react"
import SkillModifier from "../skill-modifier"
import { Attributes } from "../../types"
import { SKILL_LIST } from "../../consts"

import "./skill-list.css"
import { PrimitiveAtom, useAtom } from "jotai"

type SkillListProps = {
  attributes: Attributes
  skillsAtom: PrimitiveAtom<Record<string, number>>
}

function SkillList({ attributes, skillsAtom }: SkillListProps) {
  const [skills, setSkills] = useAtom(skillsAtom)
  const [usedPoints, setUsedPoints] = useState<number>(Object.values(skills).reduce((acc, value) => acc + value, 0))

  const abilityPoints = useMemo(
    () => 10 + 4 * (Math.floor(attributes.Intelligence / 2) - 5),
    [attributes]
  )

  const modifierPointsPerAttributes = useMemo(
    () =>
      Object.keys(attributes).reduce(
        (acc, attribute) => ({
          ...acc,
          [attribute]: Math.floor(attributes[attribute] / 2) - 5,
        }),
        {} as Attributes
      ),
    [attributes]
  )

  const onIncrease = (skill: string) => {
    if (usedPoints >= abilityPoints) {
      alert("No more points available")
      return
    }
    setSkills(prev => {
      const value = prev[skill] || 0
      return { ...prev, [skill]: value  + 1 }
    })

    setUsedPoints((prev) => prev + 1)
  }

  const onDecrease = (skill: string) => {
    setSkills((prev) =>
      Object.entries(prev).reduce((acc, [name, value = 0]) => {
        if (name === skill) {
          return { ...acc, [name]: value - 1 }
        }
        return { ...acc, [name]: value }
      }, {} as Record<string, number>)
    )
    setUsedPoints((prev) => prev - 1)
  }

  return (
    <div className="skills">
      <h2>Skills</h2>
      <p>Total skill points available: {abilityPoints - usedPoints}</p>
      <div className="skillList">
        {SKILL_LIST.map(({ name, attributeModifier }) => (
          <SkillModifier
            key={name}
            skill={name}
            modifier={attributeModifier}
            value={skills[name] || 0}
            modifierPoints={modifierPointsPerAttributes[attributeModifier]}
            handleDecrease={onDecrease}
            handleIncrease={onIncrease}
          />
        ))}
      </div>
    </div>
  )
}

export default SkillList
