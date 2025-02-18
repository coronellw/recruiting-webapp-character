import { useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../../consts";
import AttributeModifier from "../attribute-modifier/attribute-modifier";
import ClassType from "../class-type";
import { Attributes, Class} from "../../types";

export default function Character() {
  const [attributes, setAttributes] = useState<Attributes>(
    ATTRIBUTE_LIST.reduce((acc, attribute) => ({ ...acc, [attribute]: 10 }), {} as Attributes)
  );

  return (
    <div>
      <h2>Character</h2>

      <div className="stats">
        <div className="attributes">
          <h3>Attributes</h3>
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
          { Object.entries(CLASS_LIST).map(([classType, classAttributes]) => (
            <ClassType
              key={classType}
              classType={classType as Class}
              classAttributes={classAttributes}
              characterAttributes={attributes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
