import "./attribute-modifier.css";

type AttributeModifierProps = {
  name: string;
  value: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
};

export default function AttributeModifier({
  name,
  value,
  handleIncrease,
  handleDecrease,
}: AttributeModifierProps) {
  const modifier = Math.floor(value / 2);

  return (
    <span className="attribute">
      <span className="attribute__name">{name}</span>
      <span>Value: {value}</span>
      <span>(Modifier: {modifier - 5})</span>
      <span>
        <button onClick={handleIncrease}>+</button>
        <button onClick={handleDecrease}>-</button>
      </span>
    </span>
  );
}
