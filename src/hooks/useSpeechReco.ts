import { useState, useEffect } from 'react';

const useSpeechReco = (setValue: any) => {
  const [isListening, setIsListening] = useState(false);

  let recognition: any = null;
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
  }
  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      //   if (event === undefined) return;
      console.log('onresult', event, isListening);
      setValue(event.results[0][0].transcript);
      recognition.stop();
      setIsListening(false);
    };
  }, []);
  const startListening = () => {
    console.log('started', isListening);

    setValue('');
    setIsListening(true);
    recognition.start();
  };
  const stopListening = () => {
    console.log('stoping', isListening);
    setIsListening(false);
    recognition.stop();
  };

  return { recognition, isListening, startListening, stopListening };
};

export default useSpeechReco;
