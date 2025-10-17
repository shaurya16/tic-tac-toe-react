import { useState } from "react";
const initiaGamelBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ symbol, onSelect }) {
  const [gameBoard, setGameBoard] = useState(initiaGamelBoard);

  const handleSelectButton = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      if (updatedBoard[rowIndex][colIndex] === null) {
        updatedBoard[rowIndex][colIndex] = symbol;
      }
      return updatedBoard;
    });

    onSelect();
  };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleSelectButton(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
