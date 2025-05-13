import React, { useState, useEffect } from 'react';

const PUZZLE_SIZE = 4; // 4x4 puzzle

function shuffleArray(array) {
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function App() {
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(PUZZLE_SIZE * PUZZLE_SIZE - 1);

  useEffect(() => {
    // Initialize tiles in order and shuffle
    let initialTiles = Array.from({ length: PUZZLE_SIZE * PUZZLE_SIZE }, (_, i) => i);
    initialTiles = shuffleArray(initialTiles);
    // Ensure last tile is empty (represented by PUZZLE_SIZE*PUZZLE_SIZE - 1)
    if (!initialTiles.includes(PUZZLE_SIZE * PUZZLE_SIZE - 1)) {
      initialTiles[initialTiles.length - 1] = PUZZLE_SIZE * PUZZLE_SIZE - 1;
    }
    setTiles(initialTiles);
    setEmptyIndex(initialTiles.indexOf(PUZZLE_SIZE * PUZZLE_SIZE - 1));
  }, []);

  const canMove = (index) => {
    const row = Math.floor(index / PUZZLE_SIZE);
    const col = index % PUZZLE_SIZE;
    const emptyRow = Math.floor(emptyIndex / PUZZLE_SIZE);
    const emptyCol = emptyIndex % PUZZLE_SIZE;
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const moveTile = (index) => {
    if (canMove(index)) {
      const newTiles = tiles.slice();
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      setEmptyIndex(index);
    }
  };

  return (
    <>
      <h1 className="game-title">DigitPuzzle</h1>
      <div className="puzzle-container">
        {tiles.map((tile, index) => (
          <div
            key={tile}
            className={`tile ${tile === PUZZLE_SIZE * PUZZLE_SIZE - 1 ? 'empty' : ''}`}
            onClick={() => moveTile(index)}
          >
            {tile !== PUZZLE_SIZE * PUZZLE_SIZE - 1 ? tile + 1 : ''}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
