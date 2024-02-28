import React from "react";
import { token } from "../../../declarations/token";
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";
//import { AuthClient } from "@dfinity/auth-client";
//import { canisterId, createActor } from "../../../declarations/token";

function Faucet() {

  const [btnLabel, setLabel] = React.useState("Gimme gimme");
  const [isDisabled, setDisabled] = React.useState(false);

  async function handleClick(event) {
    setDisabled(true);

    //const authClient = await AuthClient.create();
    //const identity = await AuthClient.getIdentity();
    //const authenticatedCanister = createActor(canisterId, {
    //  agentOptions: {
    //    identity,
    //  },
    //});
    
    //var status = await authenticatedCanister.payOut();

    var status = await token.payOut();
    setLabel(status);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {isDisabled}>
          {btnLabel}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
