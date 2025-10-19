import { useState } from "react";

export default function Player({ name, symbol, isActive, onNameChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const handleEditClick = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onNameChange(symbol, inputValue);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  let playerName = <span className="player-name">{inputValue}</span>;

  if (isEditing) {
    playerName = (
      <input type="text" required value={inputValue} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
