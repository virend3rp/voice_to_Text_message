import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState } from "react";

let isActive = false;

function App() {
  const [activestatus, setActivestatus] = useState("Speech Recognition is NOT Active");
  const { transcript, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    if (!isActive) {
      setActivestatus("Speech Recognition is Active");
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      isActive = true;
    } else {
      setActivestatus("Speech Recognition is Not Active");
      SpeechRecognition.stopListening();
      resetTranscript(); // Clear the previous transcript when stopping
      isActive = false;
    }
  };

  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcript.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <div className="w-full next-w-md nx-auto p-6 bg-black rounded-lg shadow-lg">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Speech to Text</h2>
            <p className="text-muted-foreground text-white">
              Convert your speech to text with ease
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <button
              id="btn"
              onClick={startListening}
              className="bg-zinc-956 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-primary hover:bg-primary/98 h-10 px-4 py-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="nr-2 h-5 w-5"
              >
                <path d="M12 2a3 3 0 0 0 -3 3v7a3 3 0 0 0 6 0v-7a3 3 0 0 0 -3 -3z"></path>
                <path d="M10 10V2A7 7 0 0 1-14 0V-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
              Start/Stop
            </button>
            <div className="flex gap-2">
              <button
                id="btn"
                onClick={resetTranscript}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-gray-600 hover:bg-gray-700 h-10 px-4 py-2 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="nr-2 h-5 w-5"
                >
                  <path d="M5 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H5a2 2 0 0 1-2-2v-4"></path>
                </svg>
                <span className="sr-only">Clear</span>
              </button>
              <button
                id="btn"
                onClick={() => copy(transcript)}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-blue-500 hover:bg-blue-600 h-10 px-4 py-2 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="nr-2 h-5 w-5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span className="sr-only">Download</span>
              </button>
            </div>
          </div>
          <textarea
            value={transcript}
            className="flex min-h-[80px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full resize-none rounded-md border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-white"
            placeholder="Your speech will appear here...."
            rows="4"
            disabled
          ></textarea>
          <div className="flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse nr-2"></div>
            <span className="text-white text-sm font-medium text-muted-foreground">
              {activestatus}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
