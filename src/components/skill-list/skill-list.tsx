import { useState } from "react";
import SkillModifier from "../skill-modifier";
import { Attributes } from "../../types";
import { SKILL_LIST } from "../../consts";

import "./skill-list.css"

type SkillListProps = {
  abilityPoints: number;
  modifierPointsPerAttributes: Attributes;
};

type skill = { name: string; attributeModifier: string; value: number };

function SkillList({
  abilityPoints,
  modifierPointsPerAttributes,
}: SkillListProps) {
  const [usedPoints, setUsedPoints] = useState<number>(0);
  const [skills, setSkills] = useState<skill[]>(
    SKILL_LIST.reduce((acc, skill) => {
      return [...acc, { ...skill, value: 0 }];
    }, [] as skill[])
  );

  const onIncrease = (skill: string) => {
    if (usedPoints >= abilityPoints) {
      alert("No more points available")
      return 
    }
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name === skill) {
          return { ...s, value: s.value + 1 };
        }
        return s;
      })
    );
    setUsedPoints((prev) => prev + 1);
  };

  const onDecrease = (skill: string) => {
    setSkills((prev) =>
      prev.map((s) => {
        if (s.name === skill) {
          return { ...s, value: s.value - 1 };
        }
        return s;
      })
    );
    setUsedPoints((prev) => prev - 1);
  };

  return (
    <div>
      <p>Total skill points available: {abilityPoints - usedPoints}</p>
      <div className="skillList">
        {skills.map(({ name, attributeModifier, value }) => (
          <SkillModifier
            key={name}
            skill={name}
            modifier={attributeModifier}
            value={value}
            modifierPoints={modifierPointsPerAttributes[attributeModifier]}
            handleDecrease={onDecrease}
            handleIncrease={onIncrease}
          />
        ))}
      </div>
    </div>
  );
}

export default SkillList;
