import { act, useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";

function App() {
  const [activeSymbol, setActiveSymbol] = useState("X");

  const handlePlayerSelect = () => {
    setActiveSymbol((activeSymbol) => {
      if (activeSymbol === "X") {
        return "O";
      } else {
        return "X";
      }
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activeSymbol === "X"} />
          <Player name="Player 2" symbol="O" isActive={activeSymbol === "O"} />
        </ol>
        <GameBoard symbol={activeSymbol} onSelect={handlePlayerSelect} />
      </div>
    </main>
  );
}

export default App;
