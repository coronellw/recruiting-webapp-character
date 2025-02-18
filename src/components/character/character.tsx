import { useEffect, useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../../consts";
import AttributeModifier from "../attribute-modifier/attribute-modifier";
import ClassType from "../class-type";
import { Attributes, Class } from "../../types";

import "./character.css";
import SkillList from "../skill-list";

export default function Character() {
  const [attributes, setAttributes] = useState<Attributes>(
    ATTRIBUTE_LIST.reduce(
      (acc, attribute) => ({ ...acc, [attribute]: 10 }),
      {} as Attributes
    )
  );

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
    // code to recover character from the server
  },[])

  return (
    <div>
      <h1>Character</h1>

      <div className="stats">
        <div className="attributes">
          <h2>Attributes</h2>
          {Object.entries(attributes).map(([attribute, value]) => (
            <AttributeModifier
              key={attribute}
              name={attribute}
              value={value}
              handleIncrease={() =>
                setAttributes((prev) => ({
                  ...prev,
                  [attribute]: prev[attribute] + 1,
                }))
              }
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
