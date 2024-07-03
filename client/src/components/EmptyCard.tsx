// EmptyCard.tsx
import React from 'react';

const EmptyCard: React.FC = () => {
  return (
    <div className="w-1/3 h-[300px] border-2 border-dashed border-gray-300 flex justify-center items-center mx-auto">
      <span className="text-gray-500">Empty</span>
    </div>
  );
};

export default EmptyCard;
