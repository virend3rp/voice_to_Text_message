import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState, useRef } from "react";

let isActive = false;

function App() {
  const [activestatus, setActivestatus] = useState("Speech Recognition is NOT Active");
  const [transcriptLog, setTranscriptLog] = useState([]);
  const transcriptRef = useRef(""); // Store transcript in ref to avoid unnecessary re-renders

  const { transcript, resetTranscript } = useSpeechRecognition();

  const startListening = () => {
    if (!isActive) {
      setActivestatus("Speech Recognition is Active");
      SpeechRecognition.startListening({ continuous: true, language: "en-IN", interimResults: true });
      isActive = true;
    } else {
      setActivestatus("Speech Recognition is Not Active");
      SpeechRecognition.stopListening();
      // Only log the final transcript once the recording ends
      setTranscriptLog((prevLogs) => [...prevLogs, transcript]);
      resetTranscript();
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

  const clearLogs = () => {
    setTranscriptLog([]); // Clear the logs
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Speech to Text</h2>
          <p className="text-muted-foreground text-white">Convert your speech to text with ease</p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            id="btn"
            onClick={startListening}
            className="bg-blue-500 hover:bg-blue-600 rounded-md text-sm font-medium transition-colors h-12 px-6 py-3 text-white flex items-center justify-center"
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
              className="h-6 w-6 mr-2"
            >
              <path d="M12 2a3 3 0 0 0 -3 3v7a3 3 0 0 0 6 0v-7a3 3 0 0 0 -3 -3z"></path>
              <path d="M10 10V2A7 7 0 0 1-14 0V-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
            {isActive ? "Stop" : "Start"}
          </button>
          <div className="flex gap-2">
            <button
              id="btn"
              onClick={resetTranscript}
              className="bg-gray-600 hover:bg-gray-700 rounded-md text-sm font-medium h-10 px-4 py-2 text-white"
            >
              Clear
            </button>
            <button
              id="btn"
              onClick={() => copy(transcript)}
              className="bg-blue-500 hover:bg-blue-600 rounded-md text-sm font-medium h-10 px-4 py-2 text-white"
            >
              Copy
            </button>
            <button
              id="btn"
              onClick={downloadTranscript}
              className="bg-green-500 hover:bg-green-600 rounded-md text-sm font-medium h-10 px-4 py-2 text-white"
            >
              Download
            </button>
            <button
              id="btn"
              onClick={clearLogs}
              className="bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium h-10 px-4 py-2 text-white"
            >
              Clear Logs
            </button>
          </div>
        </div>
        <textarea
          value={transcript}
          className="flex min-h-[120px] w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm text-white"
          placeholder="Your speech will appear here..."
          rows="4"
          disabled
        ></textarea>
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-white text-sm font-medium">{activestatus}</span>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-white">Transcript Log</h3>
          <div className="bg-gray-700 rounded-md p-4">
            {transcriptLog.length === 0 ? (
              <p className="text-gray-400">No previous transcripts.</p>
            ) : (
              transcriptLog.map((log, index) => (
                <div key={index} className="text-sm text-white py-1">
                  {index + 1}. {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
