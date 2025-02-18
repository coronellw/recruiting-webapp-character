import "./skill-modifier.css";

type AttributeModifierProps = {
  skill: string;
  value: number;
  modifier: string;
  modifierPoints: number;
  handleIncrease: (string) => void;
  handleDecrease: (string) => void;
};

export default function AttributeModifier({
  skill,
  value,
  modifier,
  modifierPoints = 0,
  handleIncrease,
  handleDecrease,
}: AttributeModifierProps) {

  return (
    <span className="skill">
      <span className="skill__name">{skill}</span>
      <span>{value}</span>
      <span>(Modifier: {modifier}): {modifierPoints}</span>
      <span>
        <button onClick={() => handleIncrease(skill)}>+</button>
        <button onClick={() => handleDecrease(skill)}>-</button>
      </span>
      <span>Total: {modifierPoints + value}</span>
    </span>
  );
}
