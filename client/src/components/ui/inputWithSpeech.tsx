import useSpeechToText from 'react-hook-speech-to-text';
interface InputWithSpeech {
  inputValue: any;
  name: string;
  label: string;
  placeholder: string;
  setInput: any;
  disabled: any;
}
const InputWithSpeech = ({
  name,
  label,
  placeholder,
  inputValue,
  setInput,
  disabled
}: InputWithSpeech) => {
  const {
    error,
    interimResult,
    isRecording,
    // results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: false,
    timeout: 3000,
    useLegacyResults: false,
  });
  const handleStop = () => {
    stopSpeechToText();
    setInput(interimResult);
  };
  const handleStart = () => {
    setInput('');
    startSpeechToText();
  };
  return (
    <>
      <label htmlFor={name} className="block font-bold text-[#000000]">
        {label}
      </label>
      <input
          type="text"
          id={name}
          name={name}
          placeholder={placeholder}
          className="border border-grey border border-gray-300 shadow p-1 w-full rounded"
          value={inputValue}
          onChange={e => setInput(e.target.value)}
          disabled={disabled}
        />
    </>
  );
};
export default InputWithSpeech;
