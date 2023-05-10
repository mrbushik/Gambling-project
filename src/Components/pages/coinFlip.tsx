import React, { useEffect, useState } from "react";
import "../../styles/coinFlip.scss";

interface coinInfoInterface {
  randomValue: number;
  heads: number;
  tails: number;
}

const CoinFlip: React.FC = () => {
  let initialized: boolean = false;
  let coin: any;

  const [coinInfo, setCoinInfo] = useState<coinInfoInterface>({
    randomValue: 0,
    heads: 0,
    tails: 0,
  });
  useEffect(() => {}, []);

  useEffect(() => {
    let timer: any;
    coin = document.querySelector(".coin");

    if (coin && !initialized) {
      initialized = true;
      coin.removeAttribute("style");
      if (coinInfo.randomValue < 50000) {
        timer = setTimeout(function () {
          coin.style.animation = "spin-heads 3s forwards";
        }, 100);
      } else {
        timer = setTimeout(function () {
          console.log("tails");
          coin.style.animation = "spin-tails 3s forwards";
        }, 100);
      }
    }
    return () => clearTimeout(timer);
  }, [coinInfo]);

  const handleCoinFlip = () => {
    handleRandom();
  };

  const handleRandom = () =>
    setCoinInfo((prevState: coinInfoInterface) => ({
      ...prevState,
      randomValue: Math.floor(Math.random() * 100000),
    }));
  const handleRemoveStyle = () => coin.removeAttribute("style");

  return (
    <div>
      <div className="container">
        <div className="coin" id="coin">
          <div className="heads">
            <img src="https://res.cloudinary.com/drfjcq9hg/image/upload/v1683753396/coin2_zicn4n.png" />
          </div>
          <div className="tails">
            <img src="https://res.cloudinary.com/drfjcq9hg/image/upload/v1683753396/coin1_ldy6ou.png" />
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
