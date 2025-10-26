import React from "react";
import confetti from "canvas-confetti";
import "./CelebrationButtons.css";

const CelebrationButtons = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
    });
  };

  const triggerBalloonParty = () => {
    // Simulate balloons with circle shapes
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 },
      shapes: ['circle'],
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'],
      scalar: 1.5,
      gravity: 0.3
    });
  };

  const triggerHeartShower = () => {
    // Heart-shaped particles using custom emoji or different effect
    // Since canvas-confetti doesn't support heart shapes, use colored particles
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#ff5252', '#ff4081', '#e91e63', '#f06292'],
      gravity: 0.4,
      scalar: 1.2
    });
  };

  const triggerFireworkShow = () => {
    // Multiple bursts for fireworks effect
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: randomInRange(50, 100),
        spread: randomInRange(50, 70),
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
      });

      confetti({
        particleCount,
        startVelocity: randomInRange(50, 100),
        spread: randomInRange(50, 70),
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
      });
    }, 250);
  };

  return (
    <section className="celebration-buttons">
      <h2>🎉 Celebrate Now!</h2>
      <div className="buttons-container">
        <button className="celebrate-btn confetti" onClick={triggerConfetti}>
          🎊 Confetti Burst
        </button>
        <button className="celebrate-btn balloons" onClick={triggerBalloonParty}>
          🎈 Balloon Party
        </button>
        <button className="celebrate-btn hearts" onClick={triggerHeartShower}>
          ❤️ Heart Shower
        </button>
        <button className="celebrate-btn fireworks" onClick={triggerFireworkShow}>
          🎆 Firework Show
        </button>
      </div>
    </section>
  );
};

export default CelebrationButtons;
