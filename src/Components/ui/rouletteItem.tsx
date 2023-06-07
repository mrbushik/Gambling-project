import React, { useEffect, useState } from "react";

import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import getRandomIntInRange from "../common/utils/getRandomIntInRange";
import "../../styles/roulette.scss";
import "../../styles/main.scss";
import Bets from "./bets";
import { betsInfo, prizesInterface } from "../interfaces";
import { prizes } from "../prizes";
import Timer from "./timer";
import Balance from "../Store/balance";
import UserBalance from "./userBalance";

// import UserBalance from "../Store/balance";

import RouletteHistory from "./rouletteHistory";
import RouletteBets from "./rouletteBets";
import { observer } from "mobx-react-lite";

//TODO rewrite this
const reproducedPrizeList = [
  ...prizes,
  ...prizes,
  ...prizes,
  ...prizes,
  ...prizes,
  ...prizes,
];

const reproducedPrizeListWithId = reproducedPrizeList.map((item) => {
  return {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`,
    ...item,
  };
});

const API = {
  getPrizeIndex: async () => {
    const randomPrizeIndex = getRandomIntInRange(0, prizes.length - 1);
    const randomPrizeIndexOffset = prizes.length * 4;
    return randomPrizeIndex + randomPrizeIndexOffset;
  },
};

const RouletteItem: React.FC = observer(() => {
  const defaultBetsInfo: betsInfo = {
    red: 0,
    green: 0,
    black: 0,
  };

  //TODO prize object type
  const [prizeList, setPrizeList] = useState<any>([]);
  const [start, setStart] = useState(false);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [prizeIndex, setPrizeIndex] = useState<number>(0);
  const [balance, setBalance] = useState<number>(1000);
  const [lastWinElem, setLastWinElem] = useState<prizesInterface>();
  const [betInfo, setBetInfo] = useState<betsInfo>(defaultBetsInfo);
  const [guessedInRow, setGuessedInRow] = useState(0);
  //TODO type will prize item

  useEffect(() => {
    setPrizeList(reproducedPrizeListWithId);
  }, []);

  useEffect(() => {
    if (!prizeIndex || start) {
      return;
    }

    setStart(true);
  }, [prizeIndex, start]);

  useEffect(() => {
    if (!spinning || !prizeList.length) {
      return;
    }

    const prepare = async () => {
      const newPrizeIndex = await API.getPrizeIndex();
      setPrizeIndex(newPrizeIndex);
      setStart(false);
      setLastWinElem(prizeList[newPrizeIndex]);
    };

    prepare();
  }, [spinning, prizeList]);

  const handleStart = () => setSpinning(true);

  const handlePrizeDefined = () => {
    console.log("🥳 Prize defined! 🥳");
    setSpinning(false);
    handleBalanceCalculation();
    setBetInfo(defaultBetsInfo);
  };

  const handleBalanceCalculation = () => {
    if (lastWinElem) {
      const sumWin = lastWinElem.winMultiplier * betInfo[lastWinElem.type];
      setBalance((prevState) => prevState + sumWin);
      handleGuessedTimes(sumWin);
      console.log(
        Balance.count +
          " Balance and sumWin" +
          sumWin +
          " all summ => " +
          Balance.count +
          sumWin
      );
      Balance.change(Balance.count + sumWin);
    }
  };

  const handleGuessedTimes = (sumWin: number) => {
    if (guessedInRow === 9 && sumWin >= 2) {
      setBalance((prevState) => prevState + 50);
      Balance.change(Balance.count + 50);
      setGuessedInRow(0);
    }
    sumWin >= 2 ? setGuessedInRow((perv) => perv + 1) : setGuessedInRow(0);
  };

  const handleBet = (color: string, value: number, currentBet: number) => {
    if (color === "red" && betInfo.black) return;
    if (color === "black" && betInfo.red) return;
    if (balance - currentBet < 0 || spinning) return;
    setBetInfo((prevState) => ({ ...prevState, [color]: value }));
    setBalance((perv) => perv - currentBet);
    Balance.change(Balance.count - currentBet);
  };

  return (
    <>
      {/*<UserBalance balance={balance} />*/}
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex}
        start={start}
        spinningTime={7}
        onPrizeDefined={handlePrizeDefined}
        defaultDesignOptions={{ prizesWithText: true }}
        options={{ withoutAnimation: true, stopInCenter: false }}
      />
      <Timer onStart={handleStart} spiningNow={spinning} />
      <div>
        <RouletteHistory
          droppedElement={lastWinElem}
          spinningNow={spinning}
          guessedCount={guessedInRow}
        />
        <RouletteBets betsInfo={betInfo} onBet={handleBet} balance={balance} />
      </div>
    </>
  );
});

export default RouletteItem;
