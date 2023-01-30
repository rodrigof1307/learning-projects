import Signature from "./Signature";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import CreateWallet from "./CreateWallet";

function App() {
  return (
    <div className="app">
      <div className="wallet-container">
        <Signature />
        <CreateWallet/>
      </div>
      <Transfer/>
    </div>
  );
}

export default App;
