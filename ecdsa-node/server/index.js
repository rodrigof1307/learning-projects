const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { toHex, utf8ToBytes  } = require("ethereum-cryptography/utils");
const secp256k1 = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak");


app.use(cors());
app.use(express.json());

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  const hash = keccak256(bytes); 
  return hash
}

const balances = {
  "04de2d4285897bc05658ec4621df9a52f06179e99f2df281ed6ee1c2df6c35aeccaaac88e4465889f842d323474f746bd55daf59898d3d59675b008463f323d0da": 100,
  "0494af00589c39feb74fb2a781d711ada6b9b25ccab0a5a3b9a44d1cb41ccd147ce80aac9fa6816276d773bd7c9463d06df071b268ed3682f24849c7ae3e3abb99": 50,
  "040e6516727e0b5e7e3c46a88656514b85eac14db275533fa69833342a8fbab60c271b0aa19ec27ee9981b7fa8212d7cde721eb5e12f62acc85694028671ebf1b7": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { signature, recovery, recipient, amount } = req.body;

  console.log(req.body)

  const sender = toHex(secp256k1.recoverPublicKey(hashMessage("Rodrigo"), signature, parseFloat(recovery)))
  if(!(balances[sender])) {
    res.status(400).send({ status: false, message: "Invalid signature" });
  }

  if(!(balances[recipient])) {
    res.status(400).send({ status: false, message: "Invalid recipient" });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ status: false, message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ status: true });
  }
});

app.post("/create", (req, res) => {
  const { newWallet } = req.body;

  setInitialBalance(newWallet);

  res.send({ message: "done" });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 50;
  }
}
