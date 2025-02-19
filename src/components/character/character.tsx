import { useCallback, useEffect, useState } from "react";
import { CLASS_LIST } from "../../consts";
import AttributeModifier from "../attribute-modifier/attribute-modifier";
import ClassType from "../class-type";
import { Attributes, Class, Skill } from "../../types";

import "./character.css";
import SkillList from "../skill-list";
import SkillCheck from "../skill-check";

const LEVEL_RESTRICTIONS = 70;

type CharacterProps = {
  name: string;
  attributes: Attributes;
  updateCharacter: (name: string, attributes: Attributes) => void;
  deleteCharacter: (name: string) => void;
};

export default function Character({
  attributes: characterAttributes,
  updateCharacter,
  deleteCharacter,
  name,
}: CharacterProps) {
  const [attributes, setAttributes] = useState<Attributes>(characterAttributes);
  const [skillTree, setSkillTree] = useState<Skill[]>([]);
  const [currentLevel, setCurrentLevel] = useState(
    Object.values(attributes).reduce((acc, value) => acc + value, 0)
  );

  const modifierPointsPerAttributes = Object.keys(attributes).reduce(
    (acc, attribute) => ({
      ...acc,
      [attribute]: Math.floor(attributes[attribute] / 2) - 5,
    }),
    {} as Attributes
  );

  useEffect(() => {
    const newLevel = Object.values(attributes).reduce(
      (acc, value) => acc + value,
      0
    );
    if (newLevel !== currentLevel) {
      setCurrentLevel(newLevel);
      updateCharacter(name, attributes);
    }
  }, [attributes, currentLevel, name, updateCharacter]);

  const onIncrease = (attribute: string) => {
    if (currentLevel >= LEVEL_RESTRICTIONS) {
      return;
    }
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }));
  };

  const handleDeleteCharacter = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteCharacter(name);
    }
  };

  const handleSkillTreeUpdate = useCallback((skillsTree: Skill[]) => {
    setSkillTree(skillsTree);
  }, []);

  return (
    <div className="character">
      <h1>
        Character-[{name}] ({currentLevel})
      </h1>

      <div className="stats">
        <div className="attributes">
          <h2>Attributes</h2>
          {Object.entries(attributes).map(([attribute, value]) => (
            <AttributeModifier
              key={attribute}
              name={attribute}
              value={value}
              handleIncrease={() => onIncrease(attribute)}
              handleDecrease={() =>
                setAttributes((prev) => ({
                  ...prev,
                  [attribute]: prev[attribute] - 1,
                }))
              }
            />
          ))}
        </div>

        <div className="classes">
          <h2>Classes</h2>
          {Object.entries(CLASS_LIST).map(([classType, classAttributes]) => (
            <ClassType
              key={classType}
              classType={classType as Class}
              classAttributes={classAttributes}
              characterAttributes={attributes}
            />
          ))}
        </div>

        <div className="skills">
          <h2>Skills</h2>
          <SkillList
            abilityPoints={
              10 + 4 * (Math.floor(attributes.Intelligence / 2) - 5)
            }
            modifierPointsPerAttributes={modifierPointsPerAttributes}
            updateSkillTree={handleSkillTreeUpdate}
          />
        </div>

        <div className="skillCheck">
          <h2>Skill Check</h2>
          <SkillCheck
            skillTree={skillTree.map((skill) => ({
              ...skill,
              value: skill.value + modifierPointsPerAttributes[skill.attributeModifier],
            }))}
          />
        </div>
      </div>
      <button className="btn btn--danger" onClick={handleDeleteCharacter}>
        DELETE
      </button>
    </div>
  );
}
