import React, { useEffect, useState } from "react";
import "../../styles/coinFlip.scss";
import CoinFlipBets from "../ui/coinFlipBets";
import Balance from "../Store/balance";
import { observer } from "mobx-react-lite";
interface coinInfoInterface {
  randomValue: number;
  heads: number;
  tails: number;
}
//TODO start MobX
const CoinFlip: React.FC = observer(() => {
  let initialized: boolean = false;
  let coin: any;

  const [isActive, setIsActive] = useState<boolean>(false)

  const [coinInfo, setCoinInfo] = useState<coinInfoInterface>({
    randomValue: 0,
    heads: 0,
    tails: 0,
  });
  const [currentCoinPosition, setCurrentCoinPosition] = useState('')
  useEffect(() => {}, []);

  useEffect(() => {
    let timer: any;
    setIsActive(true)
    coin = document.querySelector(".coin");

    if (coin && !initialized) {
      initialized = true;
      coin.removeAttribute("style");
      if (coinInfo.randomValue < 50000) {
        setCurrentCoinPosition('heads')
        timer = setTimeout(function () {
          coin.style.animation = "spin-heads 3s forwards";
        }, 0);
      } else {
        timer = setTimeout(function () {
          setCurrentCoinPosition('tails')
          coin.style.animation = "spin-tails 3s forwards";
        }, 0);
      }

    }
    return () => clearTimeout(timer);
  }, [coinInfo]);

  const handleCoinFlip = (betCount: number) => {
    Balance.change(Balance.count - Number(betCount));
    handleRandom();
  };

  const handleRandom = () =>
    setCoinInfo((prevState: coinInfoInterface) => ({
      ...prevState,
      randomValue: Math.floor(Math.random() * 100000),
    }));

  return (
    <div>
      <div className="container">
        <div className="coin" id="coin">
          <div className="heads">
            <img src="https://res.cloudinary.com/drfjcq9hg/image/upload/v1683794213/coin2_1_konofg.png" />
          </div>
          <div className="tails">
            <img src="https://res.cloudinary.com/drfjcq9hg/image/upload/v1683794213/coin1_1_ptb6fm.png" />
          </div>
        </div>
        <CoinFlipBets onBet={handleCoinFlip} isActive={isActive}/>
        {/*<div className="stats">*/}
        {/*  <p className="heads-count">Heads: 0</p>*/}
        {/*  <p className="tails-count">Tails: 0</p>*/}
        {/*</div>*/}
      </div>
    </div>
  );
});
export default CoinFlip;
