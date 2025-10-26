import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./CelebrationButtons.css";

const CelebrationButtons = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [canvasSupported, setCanvasSupported] = useState(true);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    window.innerWidth <= 768;
      setIsMobile(mobile);
    };

    // Check canvas support
    const checkCanvas = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        setCanvasSupported(!!ctx);
      } catch (e) {
        setCanvasSupported(false);
      }
    };

    checkMobile();
    checkCanvas();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const triggerConfetti = () => {
    if (!canvasSupported) {
      showFallbackAnimation('confetti');
      return;
    }

    const options = {
      particleCount: isMobile ? 100 : 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
    };

    if (isMobile) {
      // Reduce particle count and adjust for mobile
      options.particleCount = 80;
      options.spread = 50;
    }

    confetti(options);
  };

  const triggerBalloonParty = () => {
    if (!canvasSupported) {
      showFallbackAnimation('balloons');
      return;
    }

    const options = {
      particleCount: isMobile ? 50 : 80,
      spread: 50,
      origin: { y: 0.8 },
      shapes: ['circle'],
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'],
      scalar: 1.5,
      gravity: 0.3
    };

    if (isMobile) {
      options.particleCount = 40;
      options.scalar = 1.2;
    }

    confetti(options);
  };

  const triggerHeartShower = () => {
    if (!canvasSupported) {
      showFallbackAnimation('hearts');
      return;
    }

    const options = {
      particleCount: isMobile ? 80 : 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#ff5252', '#ff4081', '#e91e63', '#f06292'],
      gravity: 0.4,
      scalar: 1.2
    };

    if (isMobile) {
      options.particleCount = 60;
      options.spread = 70;
    }

    confetti(options);
  };

  const triggerFireworkShow = () => {
    if (!canvasSupported) {
      showFallbackAnimation('fireworks');
      return;
    }

    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = (isMobile ? 30 : 50) * (timeLeft / duration);

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
    }, isMobile ? 400 : 250);
  };

  const showFallbackAnimation = (type) => {
    // Create a simple CSS animation fallback for mobile
    const button = document.activeElement;
    if (button) {
      button.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        button.style.animation = '';
      }, 500);
    }

    // Show a message or emoji animation
    const messages = {
      confetti: '🎊',
      balloons: '🎈',
      hearts: '❤️',
      fireworks: '🎆'
    };

    // Create floating emoji effect
    const emoji = document.createElement('div');
    emoji.textContent = messages[type];
    emoji.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 4rem;
      z-index: 10000;
      pointer-events: none;
      animation: emojiFloat 2s ease-out forwards;
    `;

    document.body.appendChild(emoji);

    setTimeout(() => {
      document.body.removeChild(emoji);
    }, 2000);
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
