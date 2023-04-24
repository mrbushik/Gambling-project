import React, { useState } from "react";
import { betsInfo } from "../interfaces";

interface BalanceInterface {
  betsInfo: betsInfo;
  onBet(color: string, value: number, currentBet: number): void;
}

const Bets: React.FC<BalanceInterface> = ({ betsInfo, onBet }) => {
  const { red, green, black }: any = betsInfo;
  const [betCount, setBetCount] = useState("0");

  const handleChange = ({ target }: any) => {
    if (!isAN(Number(target.value))) return;
    setBetCount(target.value);
  };

  const handleDoBet = (lastValue: number, color: string) => {
    const betNumberValue: number = Number(betCount);
    if (betNumberValue <= 0) return;
    onBet(color, lastValue + betNumberValue, Number(betCount));
  };

  function isAN(value: any) {
    if (value instanceof Number) value = value.valueOf(); // Если это объект числа, то берём значение, которое и будет числом

    return isFinite(value) && value === parseInt(value, 10);
  }
  return (
    <>
      <div className={"bets-input__wrapper"}>
        <input value={betCount} onChange={handleChange} />
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
