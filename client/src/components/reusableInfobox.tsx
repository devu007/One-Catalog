import React from 'react';

interface InfoBoxProps {
  title: string;
  description: string;
  isSelected: boolean;
  handleSelect: (title: string) => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, description, isSelected, handleSelect }) => {
  return (
    <div
    onClick={() => handleSelect(title)}
    className={`p-4 border ${isSelected ? 'border-purple-500 bg-blue-100' : 'border-gray-300'} rounded-md cursor-pointer`}
  >
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default InfoBox;
