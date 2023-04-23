import React, { useState, useEffect, CSSProperties } from "react";
const TimerRange = () => {
  let intervalId: any;
  const [remainingTime, setRemainingTime] = useState(45);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      clearInterval(intervalId);
      // Выполнить какой-то код после окончания таймера
    }
  }, [remainingTime]);

  useEffect(() => {
    setProgress((remainingTime / 45) * 100);
  }, [remainingTime]);

  const progressBarStyle: CSSProperties = {
    backgroundColor: "gray",
    height: "20px",
    width: "100%",
    position: "relative",
  };

  const progressFillStyle: CSSProperties = {
    backgroundColor: "green",
    height: "20px",
    width: `${progress}%`,
    position: "absolute",
    transition: "width 1s linear",
  };

  return (
     <>
       {progress <=0 ? <h3>Loading ...</h3> :  <div>
         <div style={progressBarStyle}>
           <div style={progressFillStyle} />
         </div>
         <div style={{ marginTop: "10px" }}>
           {Math.floor(remainingTime / 60)}:
           {remainingTime % 60 < 10
               ? `0${remainingTime % 60}`
               : remainingTime % 60}
         </div>
       </div>}
     </>
  );
};

export default TimerRange;
