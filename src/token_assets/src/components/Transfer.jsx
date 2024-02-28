import React from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";

function Transfer() {

  const [details, setDetails] = React.useState({
    to: "",
    amount: "",
  });

  const [status, setStatus] = React.useState("Transfer");
  const [isHidden, setHidden] = React.useState(true);
  const [isDisabled, setDisabled] = React.useState(false);

  function handleChange (event) {
    const {name, value} = event.target;

    setDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  }
  
  async function handleClick() {
    setDisabled(true);
    var currentStatus = await token.transfer(Principal.fromText(details.to), Number(details.amount));
    setStatus(currentStatus);
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                name="to"
                type="text"
                id="transfer-to-id"
                value={details.to}
                onChange={handleChange}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                name="amount"
                type="number"
                id="amount"
                value={details.amount}
                onChange={handleChange}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{status}</p>
      </div>
    </div>
  );
}

export default Transfer;
