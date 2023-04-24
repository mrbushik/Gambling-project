import React from "react";

interface balanceProps {
  balance: number;
}

const Balance: React.FC<balanceProps> = ({ balance }) => {
  return (
    <div>
      <h1>Balance: {balance}$</h1>
    </div>
  );
};

export default Balance;
