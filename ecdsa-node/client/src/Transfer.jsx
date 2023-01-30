import { useState } from "react";
import server from "./server";

function Transfer() {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [signature, setSignature] = useState("");
  const [recovery, setRecovery] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {
      const response = await server.post(`send`, {
        signature,
        recovery,
        amount: parseInt(sendAmount),
        recipient,
      });
      console.log(response)
      if(response.data.status) {
        alert("Successful transfer")
      }
    } catch (ex) {
      alert("Unsuccessful transfer\n" + ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <label>
        Signature
        <input
          placeholder="Add your signature"
          value={signature}
          onChange={setValue(setSignature)}
        ></input>
      </label>

      <label>
        Recovery
        <input
          placeholder="Add the recovery bit"
          value={recovery}
          onChange={setValue(setRecovery)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
