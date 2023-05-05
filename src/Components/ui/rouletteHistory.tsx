import React, { useEffect, useState } from "react";
import { prizesInterface } from "../interfaces";

interface rouletteHistoryProps {
  droppedElement: prizesInterface | undefined;
  spinningNow: boolean;
  guessedCount: number;
}

const RouletteHistory: React.FC<rouletteHistoryProps> = ({
  droppedElement,
  spinningNow,
  guessedCount,
}) => {
  const [lastElems, setLastElems] = useState<any[]>();

  useEffect(() => {
    if (!spinningNow) {
      if (droppedElement && !lastElems) setLastElems([droppedElement]);
      if (lastElems) {
        const targetArray = [droppedElement, ...lastElems].splice(0, 10);
        setLastElems(targetArray);
      }
    }
  }, [droppedElement, spinningNow]);

  return (
    <div>
      <h4>Last dropper items</h4>
      <div className="roulette-history__wrapper">
        {lastElems?.map((item: prizesInterface, index) => (
          <div key={index} className={`bet-square history-item ${item.type}`}>
            {item.text}
          </div>
        ))}
      </div>
      <div className='guess--wrapper'>
        <h3>Guess 10 times in a row and get 50$</h3>
        <p>{guessedCount}/10</p>
      </div>
    </div>
  );
};

export default RouletteHistory;
