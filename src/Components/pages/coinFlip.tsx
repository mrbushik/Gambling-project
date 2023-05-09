import React, { useEffect, useState } from "react";
import "../../styles/coinFlip.scss";
const CoinFlip: React.FC = () => {
  const [coinPosition, setCoinPosition] = useState<string>("");
  const [randomValue, setRandomValue] = useState<number>(0);
  let coin: any;
  useEffect(() => {
    coin = document.querySelector(".coin");
  }, []);

  useEffect(() => {
    let timer: any;

    if (coin) {
      coin.removeAttribute("style");
      if (randomValue) {
        timer = setTimeout(function () {
          coin.style.animation = "spin-heads 3s forwards";
        }, 100);
      } else {
        timer = setTimeout(function () {
          coin.style.animation = "spin-tails 3s forwards";
        }, 100);
      }
    }
    return () => clearTimeout(timer);
  }, [randomValue]);

  const handleCoinFlip = () => {
    handleRandom();
    coin.style.animation = "3s ease 0s 1 normal forwards running spin-heads";
    // handleRemoveStyle();

    // setCoinPosition("3s ease 0s 1 normal forwards running spin-heads");
  };

  const handleRandom = () => setRandomValue(Math.floor(Math.random() * 2));
  const handleRemoveStyle = () => coin.removeAttribute("style");

  return (
    <div>
      <div className="container">
        <div className="coin" id="coin" style={{ animation: coinPosition }}>
          <div className="heads">
            <img src="https://jkscoinworld.com/wp-content/uploads/2018/05/2013-a-1.jpg" />
          </div>
          <div className="tails">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKPXdeMWZbX3Vk9Qc3tgGtERTCZNe5z1OyzXN8ZejoIrXgA95Wi4mfTV3BgGr0lGHO5I4&usqp=CAU" />
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
