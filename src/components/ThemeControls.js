import React, { useState } from "react";
import "../App.css";

const ThemeControls = ({ onNameChange, onMessageChange }) => {
  const [bg1, setBg1] = useState("#ff9a9e");
  const [bg2, setBg2] = useState("#fad0c4");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleColorChange = (colorVar, value) => {
    document.documentElement.style.setProperty(colorVar, value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    onNameChange(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    onMessageChange(e.target.value);
  };

  return (
    <div className="controls">
      <label>🎂 Enter Name</label>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Your Name"
      />

      <label>💌 Enter Message</label>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
        placeholder="Happy Birthday!"
      />

      <label>🎨 Pick Theme Colors</label>
      <div className="color-inputs">
        <input
          type="color"
          value={bg1}
          onChange={(e) => {
            setBg1(e.target.value);
            handleColorChange("--bg-1", e.target.value);
          }}
        />
        <input
          type="color"
          value={bg2}
          onChange={(e) => {
            setBg2(e.target.value);
            handleColorChange("--bg-2", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default ThemeControls;
