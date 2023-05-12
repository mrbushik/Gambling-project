import React, { useState } from "react";
import { betsInfo } from "../interfaces";
import Bets from "./bets";

interface rouletteBetsProps {
  betsInfo: betsInfo;
  onBet(color: string, value: number, currentBet: number): void;
  balance: number;
}

const RouletteBets: React.FC<rouletteBetsProps> = ({
  betsInfo,
  onBet,
  balance,
}) => {
  const { red, green, black }: any = betsInfo;
  const [betCount, setBetCount] = useState<number>(0);

  const handleDoBet = (lastValue: number, color: string) => {
    const betNumberValue: number = Number(betCount);
    if (betNumberValue <= 0) return;
    onBet(color, lastValue + betNumberValue, Number(betCount));
  };

  const handlePlaceBet = (betValue: number) => setBetCount(betValue);

  return (
    <div>
      <Bets
        balance={balance}
        handlePlaceBet={handlePlaceBet}
        betCount={betCount}
      />
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
    </div>
  );
};

export default RouletteBets;
