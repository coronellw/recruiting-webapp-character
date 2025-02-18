import { useEffect, useState } from "react";
import { CLASS_LIST } from "../../consts";
import AttributeModifier from "../attribute-modifier/attribute-modifier";
import ClassType from "../class-type";
import { Attributes, Class } from "../../types";

import "./character.css";
import SkillList from "../skill-list";

const LEVEL_RESTRICTIONS = 70

type CharacterProps = {
  name: string;
  attributes: Attributes;
}

export default function Character({attributes: characterAttributes, name}: CharacterProps) {
  const [attributes, setAttributes] = useState<Attributes>(
    characterAttributes
  );
  const [currentLevel, setCurrentLevel] = useState(
    Object.values(attributes).reduce((acc, value) => acc + value, 0)
  );

  useEffect(() => {
    setCurrentLevel(Object.values(attributes).reduce((acc, value) => acc + value, 0));
  }, [attributes]);

  const saveCharacter = async() => {
    try {
      const response = await fetch("https://recruiting.verylongdomaintotestwith.ca/api/coronellw/character", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attributes,
        }),
      })
      if (response.ok) {
        alert("Character saved successfully")
      } else {
        alert("Error saving character")
      }
    } catch (error) {
      alert("Error saving character")
    }
  }

  useEffect(() => {
    fetchCharacter();
  },[])

  // code to recover character from the server
  async function fetchCharacter() {
    try {
      const response = await fetch("https://recruiting.verylongdomaintotestwith.ca/api/coronellw/character");
      const data = await response.json();
      console.log(data);
      setAttributes(data.body.attributes);
    } catch (error) {
      alert("Error recovering character");
    }
  }

  const onIncrease = (attribute: string) => {
    
    if (currentLevel >= LEVEL_RESTRICTIONS) {
      return;
    }
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }))
  }

  return (
    <div>
      <h1>Character-[{name}] ({currentLevel})</h1>

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
            abilityPoints={10 + Math.floor(attributes.Intelligence / 2)}
            modifierPointsPerAttributes={Object.keys(attributes).reduce(
              (acc, attribute) => ({
                ...acc,
                [attribute]: Math.floor(attributes[attribute] / 2) - 5,
              }),
              {} as Attributes
            )}
          />
        </div>

        <button onClick={saveCharacter}>SAVE</button>
      </div>
    </div>
  );
}
