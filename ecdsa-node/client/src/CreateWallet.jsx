import server from "./server";
import { useState } from "react";
import * as secp256k1 from "ethereum-cryptography/secp256k1"
import { toHex } from "ethereum-cryptography/utils"

function CreateWallet() {
  const [publicKey, setPublicKey] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const generateWallet = async () => {
    let privateKeyAux = secp256k1.utils.randomPrivateKey()
    setPrivateKey(toHex(privateKeyAux))
    let publicKeyAux = toHex(secp256k1.getPublicKey(privateKeyAux))
    setPublicKey(publicKeyAux)

    try {
      const {
        data: { message } ,
      } = await server.post(`create`, {
        newWallet: publicKeyAux,
      });
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <div className="container wallet">
      <h1>Don't have a Wallet?</h1>

      <button className="button" onClick={generateWallet}>Create Wallet</button>
    
      { publicKey && privateKey &&
      <>
        <p>{"Private Key: " + privateKey}</p>
        <p>{"Public Key: " + publicKey}</p>
      </>
      }

    </div>
  );
}

export default CreateWallet;
