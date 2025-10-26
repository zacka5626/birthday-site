import React, { useState } from "react";
import Header from "./components/Header";
import PhotoGallery from "./components/PhotoGallery";
import VideoPlayer from "./components/VideoPlayer";
import MessageBoard from "./components/MessageBoard";
import Countdown from "./components/Countdown";
import "./App.css";

function App() {
  const [name, setName] = useState("Aparna");
  const [message, setMessage] = useState("Here's to another year of love, laughter, and unforgettable memories.");
  const [color1, setColor1] = useState("#ff9a9e");
  const [color2, setColor2] = useState("#fad0c4");

  // update CSS variables dynamically
  const updateTheme = (varName, value) => {
    document.documentElement.style.setProperty(varName, value);
  };

  // Set a target date for the birthday (e.g., next birthday)
  const targetDate = "2024-12-25T00:00:00"; // Change this to the actual birthday date

  return (
    <div className="App">
      <Header name={name} message={message} />

      {/* 🎛️ Control Panel */}
      <div className="controls">
        <div>
          <label>🎈 Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        <div>
          <label>💌 Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter birthday message"
          />
        </div>

        <div>
          <label>🌈 Theme colors:</label>
          <div className="color-inputs">
            <input
              type="color"
              value={color1}
              onChange={(e) => {
                setColor1(e.target.value);
                updateTheme("--bg-1", e.target.value);
              }}
            />
            <input
              type="color"
              value={color2}
              onChange={(e) => {
                setColor2(e.target.value);
                updateTheme("--bg-2", e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <Countdown targetDate={targetDate} />
      <PhotoGallery />
      <VideoPlayer />
      <MessageBoard />
    </div>
  );
}

export default App;
