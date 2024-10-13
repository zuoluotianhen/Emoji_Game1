import React from 'react';

interface PixelButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const PixelButton: React.FC<PixelButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 pixel-border"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PixelButton;