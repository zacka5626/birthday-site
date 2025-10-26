import React, { useEffect, useState } from "react";
import "./Countdown.css";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) {
        setTimeLeft("🎉 It's time!");
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hrs = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${days}d ${hrs}h ${mins}m ${secs}s`);
    };

    const id = setInterval(update, 1000);
    update();
    return () => clearInterval(id);
  }, [targetDate]);

  return <div className="countdown">{timeLeft}</div>;
};

export default Countdown;
