import React, { useState } from "react";
import Bets from "./bets";
import Balance from "../Store/balance";
import { observer } from "mobx-react-lite";
import { isAction } from "mobx";

interface coinFlipBetsProps {
  onBet(betCount: number): void;
  isActive: boolean;
}

const CoinFlipBets: React.FC<coinFlipBetsProps> = observer(
  ({ onBet, isActive }) => {
    // const {  heads, tails }: any = betsInfo;

    const [betCount, setBetCount] = useState<number>(0);

    const handlePlaceBet = (betValue: number) => {
      setBetCount(betValue);
    };
    return (
      <div className="flip__bets_container">
        {/*  TODO  change balance and create globale state*/}
        <Bets
          balance={Balance.count}
          handlePlaceBet={handlePlaceBet}
          betCount={betCount}
        />
        <div className="flip__bets-btns">
          <button
            disabled={true}
            onClick={() => onBet(betCount)}
            className="flip__btn-head"
          >
            Head
          </button>
          <button
            disabled={true}
            onClick={() => onBet(betCount)}
            className="flip__btn-tail"
          >
            Tail
          </button>
        </div>
      </div>
    );
  }
);

export default CoinFlipBets;
