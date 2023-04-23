import React, { useEffect, useState, useRef } from "react";

import RoulettePro from "react-roulette-pro";
import "react-roulette-pro/dist/index.css";
import getRandomIntInRange from "../common/utils/getRandomIntInRange";
import "../../styles/roulette.scss";
import "../../styles/main.scss";
import Bets from "./bets";
import { betsInfo } from "../interfaces";
import { prizes } from "../prizes";

const winPrizeIndex = 0;

const reproductionArray = (array: any = [], length = 0) => [
  ...Array(length)
    .fill("_")
    .map(() => array[Math.floor(Math.random() * array.length)]),
];
//TODO rewrite this
const reproducedPrizeList = [
  ...prizes,
  ...prizes,
  ...prizes,
  ...prizes,
  ...prizes,
  ...prizes,
];

const generateId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).substring(2)}`;

const API = {
  getPrizeIndex: async () => {
    const randomPrizeIndex = getRandomIntInRange(0, prizes.length - 1);
    const randomPrizeIndexOffset = prizes.length * 4;
    return randomPrizeIndex + randomPrizeIndexOffset;
  },
};

const RouletteItem = () => {
  //TODO prize object type
  const [prizeList, setPrizeList] = useState<any>([]);
  const [start, setStart] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const [betInfo, setBetInfo] = useState<betsInfo>({
    red: 0,
    green: 0,
    black: 0,
  });
  //TODO type will prize item
  const [lastWinElem, setLastWinElem] = useState<any>();

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("minut");
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPrizeList(reproducedPrizeList);
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
  };
  const handleBet = (color: string, value: number) => {
    if (color === "red" && betInfo.black) return;
    if (color === "black" && betInfo.red) return;
    setBetInfo((prevState) => ({ ...prevState, [color]: value }));
  };

  return (
    <>
      <RoulettePro
        prizes={prizeList}
        prizeIndex={prizeIndex}
        start={start}
        spinningTime={7}
        onPrizeDefined={handlePrizeDefined}
        defaultDesignOptions={{ prizesWithText: true }}
        options={{ withoutAnimation: true, stopInCenter: false }}
      />
      <button onClick={handleStart}>Start</button>
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
