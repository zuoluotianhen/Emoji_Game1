const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
  '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
  '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩',
  '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
  '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
  '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗',
  '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯',
  '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐',
  '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈',
  '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾',
];

export const generateEmojiGrid = (level: number, isSimpleDifference: boolean = false): string[] => {
  const gridSize = Math.min(38, 5 + Math.floor(level / 2));
  const totalEmojis = gridSize * gridSize;
  const shuffled = [...emojis].sort(() => 0.5 - Math.random());
  const selectedEmojis = shuffled.slice(0, totalEmojis - 1);
  const targetEmojiIndex = Math.floor(Math.random() * totalEmojis);
  
  return Array(totalEmojis).fill('').map((_, index) => 
    index === targetEmojiIndex ? '🎯' : (isSimpleDifference ? selectedEmojis[0] : selectedEmojis[index % selectedEmojis.length])
  );
};

export const generateComplexGrid = (level: number): string[] => {
  const gridSize = Math.min(38, 5 + Math.floor(level / 2));
  const totalEmojis = gridSize * gridSize;
  const baseEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const differentEmojiIndex = Math.floor(Math.random() * totalEmojis);
  
  return Array(totalEmojis).fill('').map((_, index) => 
    index === differentEmojiIndex ? `${baseEmoji}-different` : baseEmoji
  );
};