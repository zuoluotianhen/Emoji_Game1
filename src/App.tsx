import React, { useState, useEffect, useCallback } from 'react';
import { Timer } from 'lucide-react';
import EmojiGrid from './components/EmojiGrid';
import { generateEmojiGrid, generateComplexGrid } from './utils/gameLogic';

type GameMode = 'findStill' | 'simpleDifference' | 'complexDifference';

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [emojis, setEmojis] = useState<string[]>([]);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);

  const startNewGame = useCallback((mode: GameMode) => {
    setScore(0);
    setLevel(1);
    setTime(60);
    setGameOver(false);
    setGameMode(mode);
    if (mode === 'findStill') {
      setEmojis(generateEmojiGrid(1));
    } else if (mode === 'simpleDifference') {
      setEmojis(generateEmojiGrid(1, true));
    } else {
      setEmojis(generateComplexGrid(1));
    }
  }, []);

  const handleCorrectGuess = useCallback(() => {
    setScore((prevScore) => prevScore + 1);
    setLevel((prevLevel) => prevLevel + 1);
    setTime(60);
    if (gameMode === 'findStill') {
      setEmojis(generateEmojiGrid(level + 1));
    } else if (gameMode === 'simpleDifference') {
      setEmojis(generateEmojiGrid(level + 1, true));
    } else {
      setEmojis(generateComplexGrid(level + 1));
    }
  }, [level, gameMode]);

  useEffect(() => {
    if (gameMode && !gameOver && time > 0) {
      const timer = setTimeout(() => setTime((prevTime) => prevTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (time === 0) {
      setGameOver(true);
    }
  }, [time, gameOver, gameMode]);

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8">Emoji Find Game</h1>
        <div className="space-y-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => startNewGame('findStill')}
          >
            Find the Still Emoji
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => startNewGame('simpleDifference')}
          >
            Simple Find the Difference
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={() => startNewGame('complexDifference')}
          >
            Complex Find the Difference
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">
        {gameMode === 'findStill' ? 'Find the Still Emoji' :
         gameMode === 'simpleDifference' ? 'Simple Find the Difference' :
         'Complex Find the Difference'}
      </h1>
      <div className="flex items-center justify-between w-full max-w-md mb-4">
        <div>Score: {score}</div>
        <div>Level: {level}</div>
        <div className="flex items-center">
          <Timer className="mr-1" />
          {time}s
        </div>
      </div>
      {gameOver ? (
        <div className="text-center">
          <h2 className="text-2xl mb-4">Game Over!</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setGameMode(null)}
          >
            Back to Menu
          </button>
        </div>
      ) : (
        <EmojiGrid emojis={emojis} onCorrectGuess={handleCorrectGuess} level={level} gameMode={gameMode} />
      )}
    </div>
  );
};

export default App;