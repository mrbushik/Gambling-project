import React, { useEffect, useState } from "react";
import "../../styles/coinFlip.scss";
const CoinFlip: React.FC = () => {
  const [coinPosition, setCoinPosition] = useState<string>("");

  useEffect(() => {
    const coin: any = document.querySelector(".coin");
    console.log(coin);

    if (coin) {
      coin.classList.remove();
      coin.style.animation = coinPosition;
      console.log(`${coinPosition} coin`);
    }
  }, [coinPosition]);

  const handleCoinFlip = () => {
    setCoinPosition("spin-heads 3s forward");
  };

  return (
    <div>
      <div className="container">
        <div className="coin" id="coin">
          <div className="heads">
            <img src="https://jkscoinworld.com/wp-content/uploads/2018/05/2013-a-1.jpg"  />
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
            Flip Coin
          </div>
          <button id="reset-button">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;
