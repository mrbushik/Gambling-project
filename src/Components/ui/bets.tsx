import React, { useState } from "react";
import { betsInfo, increaseValuesInterface } from "../interfaces";

interface BalanceInterface {
  balance: number;
  handlePlaceBet(betValue: number): void;
  betCount: number;
}

const Bets: React.FC<BalanceInterface> = ({
  balance,
  handlePlaceBet,
  betCount,
}) => {
  // const { red, green, black }: any = betsInfo;
  // const [betCount, setBetCount] = useState<number>(0);
  const increaseValues: increaseValuesInterface[] = [
    { value: 1, title: "+1", operationType: "+" },
    { value: 10, title: "+10", operationType: "+" },
    { value: 100, title: "+100", operationType: "+" },
    { value: 0.5, title: "1/2", operationType: "*" },
    { value: 2, title: "X2", operationType: "*" },
    { value: balance, title: "MAX" },
  ];

  const handleChange = ({ target }: any) => {
    if (/^\d*\.?\d*$/.test(target.value)) {
      handlePlaceBet(target.value);
    }
  };

  // function isAN(value: any) {
  //   if (value instanceof Number) value = value.valueOf();
  //
  //   return isFinite(value) && value === parseInt(value, 10);
  // }

  const handleIncreaseBet = (item: increaseValuesInterface) => {
    if (item.operationType === "+") {
      handlePlaceBet(betCount + item.value);
    } else if (item.operationType === "*") {
      handlePlaceBet(Math.round(betCount * item.value * 100) / 100);
    } else {
      handlePlaceBet(balance);
    }
  };

  return (
    <>
      <div className={"bets-input__wrapper"}>
        <div>
          <input
            value={betCount === 0 ? "" : betCount}
            onChange={handleChange}
            placeholder="Input your bet"
          />
        </div>
        <div className="bets-group-btn">
          <div className="bets-clear__btn" onClick={() => handlePlaceBet(0)}>
            CLEAR
          </div>
          {increaseValues.map((item, index) => (
            <div
              className="bets-counts__btn"
              key={index}
              onClick={() => handleIncreaseBet(item)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bets;
