import classNames from "classnames";
import { Attributes, Class } from "../../types";

import "./classes-type.css"

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
  const classEnabled = Object.entries(classAttributes).every(
    ([attribute, value]) => characterAttributes[attribute] >= value
  );
  return (
    <div
      className={classNames("class", {
        "class--enabled": classEnabled,
      })}
    >
      <h3>{classType}</h3>
    </div>
  );
}
