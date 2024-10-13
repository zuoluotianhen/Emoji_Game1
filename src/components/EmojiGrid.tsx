import React from 'react';

interface EmojiGridProps {
  emojis: string[];
  onCorrectGuess: () => void;
  level: number;
  gameMode: 'findStill' | 'simpleDifference' | 'complexDifference';
}

const EmojiGrid: React.FC<EmojiGridProps> = ({ emojis, onCorrectGuess, level, gameMode }) => {
  const gridSize = Math.min(38, 5 + Math.floor(level / 2));
  
  return (
    <div 
      className="bg-gray-800 p-4 rounded-lg"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '4px',
        width: 'fit-content',
        margin: '0 auto',
      }}
    >
      {emojis.map((emoji, index) => (
        <div
          key={index}
          className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded cursor-pointer"
          onClick={() => {
            if ((gameMode === 'findStill' && emoji === '🎯') ||
                (gameMode === 'simpleDifference' && emoji === '🎯') ||
                (gameMode === 'complexDifference' && emoji.includes('different'))) {
              onCorrectGuess();
            }
          }}
        >
          <span
            className="text-2xl"
            style={{
              animation: 
                (gameMode === 'findStill' && emoji !== '🎯') || 
                (gameMode === 'simpleDifference' && emoji !== '🎯')
                  ? 'float 0.5s ease-in-out infinite alternate'
                  : 'none',
              filter: gameMode === 'complexDifference' && emoji.includes('different')
                ? 'hue-rotate(45deg)'
                : 'none',
            }}
          >
            {emoji.replace('-different', '')}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EmojiGrid;