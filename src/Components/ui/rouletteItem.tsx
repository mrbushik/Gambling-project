import React, { useEffect, useState, useRef } from "react";

import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import getRandomIntInRange from "../common/utils/getRandomIntInRange";
import "../../styles/roulette.scss";
import "../../styles/main.scss";
import Bets from "./bets";
import { betsInfo, prizesInterface } from "../interfaces";
import { prizes } from "../prizes";
import Timer from "./timer";
import Balance from "./balance";

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

const RouletteItem = () => {
  const defaultBetsInfo: betsInfo = {
    red: 0,
    green: 0,
    black: 0,
  };

  //TODO prize object type
  const [prizeList, setPrizeList] = useState<any>([]);
  const [start, setStart] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [balance, setBalance] = useState(10);
  const [lastWinElem, setLastWinElem] = useState<prizesInterface>();
  const [betInfo, setBetInfo] = useState<betsInfo>(defaultBetsInfo);
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
      const sumWin = (betInfo[lastWinElem.type] =
        lastWinElem.winMultiplier * betInfo[lastWinElem.type]);
      setBalance((prevState) => prevState + sumWin);
    }
  };

  const handleBet = (color: string, value: number, currentBet: number) => {
    if (color === "red" && betInfo.black) return;
    if (color === "black" && betInfo.red) return;
    if (balance - currentBet < 0 || spinning) return;
    setBetInfo((prevState) => ({ ...prevState, [color]: value }));
    setBalance((perv) => perv - currentBet);
  };

  return (
    <>
      <Balance balance={balance} />
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
        <h3>выпавший элемент</h3>
        {lastWinElem && lastWinElem.text && (
          <div>
            <p>Число: {lastWinElem.text}</p>
            <p>Цвет: {lastWinElem.type}</p>
          </div>
        )}
        <Bets betsInfo={betInfo} onBet={handleBet} />
      </div>
    </>
  );
};

export default RouletteItem;
