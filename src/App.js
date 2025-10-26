import React from "react";
import Header from "./components/Header";
import PhotoGallery from "./components/PhotoGallery";
import VideoPlayer from "./components/VideoPlayer";
import MessageBoard from "./components/MessageBoard";
import Countdown from "./components/Countdown";
import CelebrationButtons from "./components/CelebrationButtons";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />

      <Countdown />
      <CelebrationButtons />
      <PhotoGallery />
      <VideoPlayer />
      <MessageBoard />
    </div>
  );
}

export default App;
