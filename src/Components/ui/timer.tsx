import React, { useState, useEffect, CSSProperties } from "react";
import TimerRange from "./timerRange";

interface timerProps {
  onStart(): void;
  spiningNow: boolean;
}

const Timer: React.FC<timerProps> = ({ onStart, spiningNow }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      onStart();
    }, 18200);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {}, []);

  return <>{!spiningNow && <TimerRange />}</>;
};

export default Timer;
