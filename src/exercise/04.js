// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';
import {useLocalStorageState} from '../utils';

function Board({ selectSquare, squares }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
      {renderSquare(0)}
      {renderSquare(1)}
      {renderSquare(2)}
    </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  // 🐨 squares is the state for this component. Add useState for squares
  const [squares, setSquares] = useLocalStorageState("game", Array(9).fill(null));
  const [moves, setMoves] = useLocalStorageState("moves", [Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useLocalStorageState("currentMove", 0);

  // 🐨 We'll need the following bits of derived state:
  const nextValue= calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  const addToHistory = (newadd) => {
    const currentMoves = [ ...moves ];
    currentMoves.push(newadd);
    setMoves(currentMoves)
  }

  function selectSquare(square) {
    // 🐨 first, if there's already winner or there's already a value at the
    // given square index (like someone clicked a square that's already been
    // clicked), then return early so we don't make any state changes
    if (winner || squares[square])
      return;

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
    addToHistory(squaresCopy);
    setCurrentMove(currentMove+1);
  }

  function selectMove (indexMove) {
    setCurrentMove(indexMove);
    setSquares(moves[indexMove]);
  }

  function restart() {
    const emptySquares = Array(9).fill(null)
    setSquares(emptySquares);
    setMoves([emptySquares]);
    setCurrentMove(0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={squares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        {
          moves.map( (x, index ) => {
            return (
              <div key={index}>
                {`${index}. `}
                <button onClick={() => selectMove(index)} disabled={index === currentMove}>
                  { index === 0 ? "Go to game start" : `Go to move #${index}` }
                  {index === currentMove ? " (Current)" : ""}
                </button>
              </div> )
          })
        }
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner} 🎉`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
