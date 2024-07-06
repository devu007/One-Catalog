import React from 'react';
import dottedPattern from '../assets/images/Screenshot 2024-07-05 at 1.37.11 AM.png';

interface EmptyCardProps {
  imageUrl?: string; // Optional prop to receive the image URL
}

const EmptyCard: React.FC<EmptyCardProps> = ({ imageUrl }) => {
  return (
    <div className="w-1/2 h-[300px] border-2 border-dashed border-gray-300 flex justify-center items-center mx-auto relative">
      <div className="absolute inset-0 z-10 flex justify-center items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected"
            className="object-contain w-full h-full"
          />
        ) : (
          <span className="text-gray-500">Empty</span>
        )}
      </div>
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: `url('${dottedPattern}')` }}
      ></div>
    </div>
  );
};

export default EmptyCard;
