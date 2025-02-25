import { CLASS_LIST } from "../../consts";
import ClassType from "../class-type";

import { Attributes, Class } from "../../types";

export default function Classes({ attributes }: { attributes: Attributes }) {
  return (
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
  );
}
