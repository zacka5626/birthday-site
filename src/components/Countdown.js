import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import "./Countdown.css";

const Countdown = () => {
  const [targetDate, setTargetDate] = useState(() => {
    const saved = localStorage.getItem("birthdayDate");
    return saved || "2024-12-25";
  });
  const [timeLeft, setTimeLeft] = useState("");
  const [isBirthday, setIsBirthday] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) {
        setTimeLeft("🎉 Happy Birthday! 🎂");
        setIsBirthday(true);
        if (!showCelebration) {
          setShowCelebration(true);
          triggerCelebration();
        }
        return;
      }
      setIsBirthday(false);
      setShowCelebration(false);
      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${days}d ${hrs}h ${mins}m ${secs}s until the big day!`);
    };

    const id = setInterval(update, 1000);
    update();
    return () => clearInterval(id);
  }, [targetDate, showCelebration]);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setTargetDate(newDate);
    localStorage.setItem("birthdayDate", newDate);
  };

  const triggerCelebration = () => {
    // Confetti
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b']
    });

    // Additional confetti bursts
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 500);
  };

  return (
    <section className="countdown-section">
      <h2>Countdown to Your Special Day</h2>
      <div className="date-input">
        <label htmlFor="birthday-date">Set Birthday Date:</label>
        <input
          id="birthday-date"
          type="date"
          value={targetDate}
          onChange={handleDateChange}
        />
      </div>
      <div className={`countdown ${isBirthday ? 'birthday' : ''}`}>{timeLeft}</div>
      {showCelebration && (
        <div className="celebration">
          <div className="balloon">🎈</div>
          <div className="balloon">🎈</div>
          <div className="balloon">🎈</div>
          <div className="heart">❤️</div>
          <div className="heart">💖</div>
          <div className="heart">💕</div>
          <div className="firework">🎆</div>
          <div className="firework">🎇</div>
        </div>
      )}
    </section>
  );
};

export default Countdown;
