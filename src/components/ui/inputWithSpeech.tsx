import useSpeechReco from '@/hooks/useSpeechReco';
import { useEffect, useState } from 'react';

interface InputWithSpeech {
  inputValue: any;
  name: string;
  label: string;
  placeholder: string;
  setInput: any;
}
const InputWithSpeech = ({
  name,
  label,
  placeholder,
  inputValue,
  setInput,
}: InputWithSpeech) => {
  const { recognition, isListening, startListening, stopListening } =
    useSpeechReco(setInput);
  return (
    <>
      <label htmlFor={name} className="block font-bold text-[#000000]">
        {label}
      </label>
      <div className="flex flex-row border border-gray-300 shadow p-1 w-full rounded">
        <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          className="border-0 grow"
          value={inputValue}
          onChange={e => setInput(e.target.value)}
        />
        {recognition && (
          <div>
            {isListening ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={stopListening}
              >
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={startListening}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                />
              </svg>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default InputWithSpeech;
