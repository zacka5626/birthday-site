import React from "react";
import Header from "./components/Header";
import PhotoGallery from "./components/PhotoGallery";
import VideoPlayer from "./components/VideoPlayer";
import MessageBoard from "./components/MessageBoard";
import Countdown from "./components/Countdown";
import "./App.css";

function App() {
  // Set a target date for the birthday (e.g., next birthday)
  const targetDate = "2024-12-25T00:00:00"; // Change this to the actual birthday date

  return (
    <div className="App">
      <Header />

      <Countdown targetDate={targetDate} />
      <PhotoGallery />
      <VideoPlayer />
      <MessageBoard />
    </div>
  );
}

export default App;
