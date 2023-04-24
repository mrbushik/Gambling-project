import React, { useState } from "react";
import { betsInfo, increaseValuesInterface } from "../interfaces";

interface BalanceInterface {
  betsInfo: betsInfo;
  onBet(color: string, value: number, currentBet: number): void;
  balance: number;
}

const Bets: React.FC<BalanceInterface> = ({ betsInfo, onBet, balance }) => {
  const { red, green, black }: any = betsInfo;
  const [betCount, setBetCount] = useState<number>(0);
  const increaseValues: increaseValuesInterface[] = [
    { value: 1, title: "+1", operationType: "+" },
    { value: 10, title: "+10", operationType: "+" },
    { value: 100, title: "+100", operationType: "+" },
    { value: 0.5, title: "1/2", operationType: "*" },
    { value: 2, title: "X2", operationType: "*" },
    { value: balance, title: "MAX" },
  ];

  const handleChange = ({ target }: any) => {
    // console.log(!isAN(Number(target.value)));
    // if (!isAN(Number(target.value))) return;
    // };
    if (/^\d*\.?\d*$/.test(target.value)) {
      setBetCount(target.value);
    }
  };

  const handleDoBet = (lastValue: number, color: string) => {
    const betNumberValue: number = Number(betCount);
    if (betNumberValue <= 0) return;
    onBet(color, lastValue + betNumberValue, Number(betCount));
  };

  function isAN(value: any) {
    if (value instanceof Number) value = value.valueOf();

    return isFinite(value) && value === parseInt(value, 10);
  }

  const handleIncreaseBet = (item: increaseValuesInterface) => {
    if (item.operationType === "+") {
      setBetCount((perv) => +perv + item.value);
    } else if (item.operationType === "*") {
      setBetCount((perv) => Math.round(perv * item.value * 100) / 100);
    } else {
      setBetCount(balance);
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
        <div className='bets-group-btn'>
          <div className='bets-clear__btn' onClick={() => setBetCount(0)}>CLEAR</div>
          {increaseValues.map((item, index) => (
            <div className='bets-counts__btn'  key={index} onClick={() => handleIncreaseBet(item)}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
      <div className="bet-wrapper">
        <div className="bet-item">
          <div className="bet-info__container">
            <div className="bet-square red"></div>
            <p>Win 2x</p>
          </div>
          <div className="bet-btn red" onClick={() => handleDoBet(red, "red")}>
            Place Bet
          </div>
          {!!red && (
            <div className="bet-count">
              <p>${red}</p>
            </div>
          )}
        </div>
        <div className="bet-item">
          <div className="bet-info__container">
            <div className="bet-square green"></div>
            <p>Win 2x</p>
          </div>
          <div
            className="bet-btn green"
            onClick={() => handleDoBet(green, "green")}
          >
            Place Bet
          </div>
          {!!green && (
            <div className="bet-count">
              <p>${green}</p>
            </div>
          )}
        </div>
        <div className="bet-item">
          <div className="bet-info__container">
            <div className="bet-square black"></div>
            <p>Win 2x</p>
          </div>
          <div
            className="bet-btn black"
            onClick={() => handleDoBet(black, "black")}
          >
            Place Bet
          </div>
          {!!black && (
            <div className="bet-count">
              <p>${black}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Bets;
