import React, { useEffect, useState } from "react";
import { prizesInterface } from "../interfaces";

interface rouletteHistoryProps {
  droppedElement: prizesInterface | undefined;
  spinningNow: boolean
}

const RouletteHistory: React.FC<rouletteHistoryProps> = ({
  droppedElement,spinningNow
}) => {
  const [lastElems, setLastElems] = useState<any[]>();

  useEffect(() => {
    if(!spinningNow){
        if (droppedElement && !lastElems)setLastElems([droppedElement]);
        if (lastElems) {
            const targetArray = [...lastElems, droppedElement].reverse().splice(0,10);
            setLastElems(targetArray);
        }
    }
  }, [droppedElement, spinningNow]);

  return (
    <div>
      <h4>Last dropper items</h4>
      <div className='roulette-history__wrapper'>
          {lastElems?.map((item: prizesInterface, index) => (
              <div className={`bet-square history-item ${item.type}`}></div>
          ))}
      </div>
    </div>
  );
};

export default RouletteHistory;
