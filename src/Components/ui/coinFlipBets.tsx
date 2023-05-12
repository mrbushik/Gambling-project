import React, { useState } from "react";
import Bets from "./bets";

interface coinFlipBetsProps {
  onBet(): void;
}

const CoinFlipBets: React.FC<coinFlipBetsProps> = ({ onBet }) => {
  // const {  heads, tails }: any = betsInfo;
  const [betCount, setBetCount] = useState<number>(0);

  const handlePlaceBet = (betValue: number) => setBetCount(betValue);
  return (
    <div className='flip__bets_container'>
      {/*  TODO  change balance and create globale state*/}
      <Bets
        balance={1000}
        handlePlaceBet={handlePlaceBet}
        betCount={betCount}
      />
      <div className="flip__bets-btns">
        <div onClick={onBet} className='flip__btn-head'>Head</div>
        <div onClick={onBet} className='flip__btn-tail'>Tail</div>
      </div>
    </div>
  );
};

export default CoinFlipBets;
