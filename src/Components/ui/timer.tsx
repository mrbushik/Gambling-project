import React, { useState, useEffect, CSSProperties } from "react";
import TimerRange from "./timerRange";

interface timerProps {
  onStart(): void;
  spiningNow: boolean;
}

const Timer: React.FC<timerProps> = ({ onStart, spiningNow }) => {
  const [showRange, setShowRange] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      onStart();
      setShowRange(false);
    }, 53200);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {}, []);

  return <>{!spiningNow && <TimerRange />}</>;
};

export default Timer;
