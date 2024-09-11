import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";
import MicNoneIcon from '@mui/icons-material/MicNone';

function App() {
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: 'change background colour to *', 
      callback: (color) => {
        document.body.style.background = color;
      },

    },
    {
      command: /reset*/,
      callback: () => {
        handleReset();
      },
    },
    
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
    {
      command: "clear screen",
      callback: () => {
        resetTranscript();
      },
    },
  ];
  const { transcript, resetTranscript } = useSpeechRecognition({commands}); //Responsible for recognization the audio and stored in the text format 
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);   //To display stop button
    microphoneRef.current.classList.add("listening");   //Adds listening animation
    SpeechRecognition.startListening({      //Starts listening continuously
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);    //To hide stop button
    microphoneRef.current.classList.remove("listening");    //Removes listening animation
    SpeechRecognition.stopListening();    //Stops listening
  };
  const handleReset = () => {
    stopHandle();   //Executes stop functionality
    resetTranscript();    //To remove data from transcript
  };


  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <MicNoneIcon style={{ color: '#000', fontSize: '48px' }} />
         
          
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
export default App;

