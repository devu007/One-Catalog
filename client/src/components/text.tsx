import React, { useState } from 'react';
import Text1 from './text1';
import Text2 from './text2';

const App: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<string>('text1');
  
    const handleButtonClick = (buttonName: string) => {
      setSelectedButton(buttonName);
    };
  
    return (
      <div>
      <button
        className={`bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer ${
          selectedButton === 'text1' ? 'border-b-2 border-[#623FC4]' : ''
        }`}
        onClick={() => handleButtonClick('text1')}
      >
        Description
      </button>

      <button
        className={`bg-[#FEFBFF] w-1/2 items-center justify-center px-2 py-2 font-semibold rounded-md cursor-pointer ${
          selectedButton === 'text2' ? 'border-b-2 border-[#623FC4]' : ''
        }`}
        onClick={() => handleButtonClick('text2')}
      >
        Features
      </button>
        <div>
          {selectedButton === 'text1' && <Text1 />}
          {selectedButton === 'text2' && <Text2 />}
        </div>
      </div>
    );
  };
  
  export default App;