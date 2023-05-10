import React, { useEffect, useState } from "react";
import "../../styles/coinFlip.scss";

interface coinInfoInterface {
  randomValue: number;
  heads: number;
  tails: number;
}

const CoinFlip: React.FC = () => {
  const [coinInfo, setCoinInfo] = useState<coinInfoInterface>({
    randomValue: 0,
    heads: 0,
    tails: 0,
  });
  const [randomValue, setRandomValue] = useState<number>(0);
  let coin: any;
  useEffect(() => {
  }, []);

  useEffect(() => {
    let timer: any;
    console.log(coin);
    coin = document.querySelector(".coin");

    if (coin) {
      console.log("work");
      coin.removeAttribute("style");
      if (coinInfo.randomValue < 50000) {
        timer = setTimeout(function () {
          coin.style.animation = "spin-heads 3s forwards";
          // setCoinInfo((prevState) =>({...prevState, [tails]: prevState.heads++}))
        }, 100);
      } else {
        timer = setTimeout(function () {
          coin.style.animation = "spin-tails 3s forwards";
        }, 100);
      }
    }
    return () => clearTimeout(timer);
  }, [coinInfo]);

  const handleCoinFlip = () => {
    handleRandom();
    // coin.style.animation = "3s ease 0s 1 normal forwards running spin-heads";
    // handleRemoveStyle();

    // setCoinPosition("3s ease 0s 1 normal forwards running spin-heads");
  };

  const handleRandom = () =>
    setCoinInfo((prevState: coinInfoInterface) => ({
      ...prevState,
      [randomValue]: Math.floor(Math.random() * 100000),
    }));
  const handleRemoveStyle = () => coin.removeAttribute("style");

  return (
    <div>
      <div className="container">
        <div className="coin" id="coin">
          <div className="heads">
            <img src="https://jkscoinworld.com/wp-content/uploads/2018/05/2013-a-1.jpg" />
          </div>
          <div className="tails">
            <img src="ttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKPXdeMWZbX3Vk9Qc3tgGtERTCZNe5z1OyzXN8ZejoIrXgA95Wi4mfTV3BgGr0lGHO5I4&usqp=CAUh" />
          </div>
        </div>
        <div className="stats">
          <p id="heads-count">Heads: 0</p>
          <p id="tails-count">Tails: 0</p>
        </div>
        <div className="buttons">
          <div id="flip-button" onClick={handleCoinFlip}>
            Bet
          </div>
          <div id="reset-button" onClick={handleRemoveStyle}>
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
