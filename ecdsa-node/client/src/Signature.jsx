import { useState } from "react";
import * as secp256k1 from "ethereum-cryptography/secp256k1"
import { keccak256 } from "ethereum-cryptography/keccak"
import { utf8ToBytes, toHex } from "ethereum-cryptography/utils";
import server from "./server";

function Signature() {
  const [privateKey, setPrivateKey] = useState("");
  const [signature, setSignature] = useState("");
  const [recovery, setRecovery] = useState("");
  const [balance, setBalance] = useState("");

  function hashMessage(message) {
    const bytes = utf8ToBytes(message);
    const hash = keccak256(bytes); 
    return hash
  }

  async function generateSignatureFunc(evt) {
    evt.preventDefault();

    const hash = hashMessage("Rodrigo")
    const signature = await secp256k1.sign(hash, privateKey, { recovered: true } );
    setSignature(toHex(signature[0]))
    setRecovery(signature[1])
    const publicKey = toHex(secp256k1.recoverPublicKey(hashMessage("Rodrigo"), signature[0], signature[1]))
    const {
      data: { balance },
    } = await server.get(`balance/${publicKey}`);
    setBalance(balance);
  }

  const setValue = (setter) => ((evt) => setter(evt.target.value));

  return (
    <div className="container wallet">
        <h1>Generate Signature</h1>
        
        <form onSubmit={generateSignatureFunc}>
          <label>
            Private Key
            <input placeholder="Type your private key" value={privateKey} onChange={setValue(setPrivateKey)}/>
          </label>

          <input type="submit" className="button" value="Generate Signature" />
        </form>

        <p className="balance">Signature: {signature}</p>
        <p className="balance">Recovery Bit: {recovery}</p>
        <p className="balance">Balance: {balance}</p>
    </div>
  );
}

export default Signature;
