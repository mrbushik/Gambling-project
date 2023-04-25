import React, { useEffect, useState } from "react";
import { prizesInterface } from "../interfaces";

interface rouletteHistoryProps {
  droppedElement: prizesInterface | undefined;
}

const RouletteHistory: React.FC<rouletteHistoryProps> = ({
  droppedElement,
}) => {
  const [lastElems, setLastElems] = useState<any[]>();
  const lastElementsArr: prizesInterface[] | undefined = [];

  useEffect(() => {
    if (lastElems) {
      const targetArray = [...lastElems, droppedElement];
      setLastElems([droppedElement]);
    }
  }, [droppedElement]);

  return (
    <div>
      <h4>Last dropper items</h4>
      {lastElems?.map((item: prizesInterface, index) => (
        <div className={`bet-square ${item.type}`}></div>
      ))}
    </div>
  );
};

export default RouletteHistory;
