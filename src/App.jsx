import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/Gameover";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameboard(gameTurns) {
  let gameBoard = [...INITAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, playerName) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    console.log("checking");
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = playerName[firstSymbol];
    }
  }

  return winner;
}

function App() {
  const [playerName, setPlayerName] = useState({
    X: PLAYERS.X,
    O: PLAYERS.O,
  });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameBoard, playerName);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handlePlayerSelect = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      console.log(`turns: ${updatedTurns[0].square.row}`);
      return updatedTurns;
    });
  };

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelect={handlePlayerSelect} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
