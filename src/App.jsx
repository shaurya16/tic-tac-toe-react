import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activeSymbol, setActiveSymbol] = useState("X");

  const handlePlayerSelect = (rowIndex, colIndex) => {
    setActiveSymbol((activeSymbol) => {
      if (activeSymbol === "X") {
        return "O";
      } else {
        return "X";
      }
    });

    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      console.log(`turns: ${updatedTurns[0].square.row}`);
      return updatedTurns;
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activeSymbol === "X"} />
          <Player name="Player 2" symbol="O" isActive={activeSymbol === "O"} />
        </ol>
        <GameBoard onSelect={handlePlayerSelect} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
