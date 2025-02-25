import { PrimitiveAtom, useAtom } from "jotai"
import AttributeModifier from "../attribute-modifier"

import { Attributes } from "../../types"
import "./attributes.css"

const LEVEL_RESTRICTIONS = 70

type AttributesProps = {
  attributesAtom: PrimitiveAtom<Attributes>
}

export default function AttributesComponent({
  attributesAtom,
}: AttributesProps) {
  const [attributes, setAttributes] = useAtom(attributesAtom)
  const level = Object.values(attributes).reduce((acc, value) => acc + value, 0)

  const onIncrease = (attribute: string) => {
    if (level >= LEVEL_RESTRICTIONS) {
      return
    }
    console.log("onIncrease pending implementation", attribute)
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] + 1,
    }))
  }

  const onDecrease = (attribute: string) => {
    console.log("onDecrease pending implementation", attribute)
    setAttributes((prev) => ({
      ...prev,
      [attribute]: prev[attribute] - 1,
    }))
  }

  return (
    <div className="attributes">
      <h2 className="title">Attributes</h2>
      {Object.entries(attributes).map(([attribute, value]) => (
        <AttributeModifier
          key={attribute}
          name={attribute}
          value={value}
          handleIncrease={() => onIncrease(attribute)}
          handleDecrease={() => onDecrease(attribute)}
        />
      ))}
    </div>
  )
}
