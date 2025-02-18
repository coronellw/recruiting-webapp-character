import classNames from "classnames";
import { Attributes, Class } from "../../types";

import "./classes-type.css";
import { useState, useRef } from "react";

type ClassesProps = {
  characterAttributes: Attributes;
  classAttributes: Attributes;
  classType: Class;
};

export default function ClassType({
  classAttributes,
  classType,
  characterAttributes,
}: ClassesProps) {
  const clickRef = useRef(null);
  const classEnabled = Object.entries(classAttributes).every(
    ([attribute, value]) => characterAttributes[attribute] >= value
  );

  const [showRequirements, setShowRequirements] = useState(false);
  const handleShowRequirements = (event) => {
    if (clickRef.current && clickRef.current.contains(event.target)) {
      return;
    }
    setShowRequirements(true);
  }
  return (
    <div
      className={classNames("class", {
        "class--enabled": classEnabled,
      })}
      onClick={handleShowRequirements}
    >
      <h3>{classType}</h3>

      {showRequirements && (
        <div className="minRequirements" ref={clickRef}>
          <h4>Minimum Requirements</h4>
          <ul>
            {Object.entries(classAttributes).map(([attribute, value]) => (
              <li key={attribute}>
                {attribute}:{" "}
                <span
                  className={classNames("attribute__value", {
                    "attribute__value--complies":
                      characterAttributes[attribute] >= value,
                  })}
                >
                  {value}
                </span>
              </li>
            ))}
          </ul>
          <button
            className="close"
            onClick={() => {
              console.log("clicked", showRequirements);
              setShowRequirements(false);
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
