import React from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [principalId, setPrincipalId] = React.useState("");
  const [balance, setBalance] = React.useState("XYZ");
  const [symbol, setSymbol] = React.useState("");
  const [isHidden, setHidden] = React.useState(true);

  function handleChange (event) {
    setPrincipalId(event.target.value);
  }

  async function handleClick() {
    setHidden(false);
    var currentBalance = await token.balanceOf(Principal.fromText(principalId));
    setBalance(currentBalance.toLocaleString());
    setSymbol(await token.getSymbol());
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principalId}
          onChange={handleChange}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden = {isHidden}>This account has a balance of {balance} {symbol}.</p>
    </div>
  );
}

export default Balance;
