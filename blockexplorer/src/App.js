import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import BlockTitle from './components/blockTitle';
import BlockInfo from './components/blockInfo';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState("");
  const [blockInfo, setBlockInfo] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBlockNumber = async () => {
      const response = await alchemy.core.getBlockNumber()
      setBlockNumber(response);
    }
    getBlockNumber()
  }, []);

  useEffect(() => {
    const getBlockInfo = async () => {
      setLoading(true)
      const response = await alchemy.core.getBlockWithTransactions(blockNumber)
      setBlockInfo(response)
      setLoading(false)
    }
    getBlockInfo()
  }, [blockNumber])

  return (
    <>
      <BlockTitle blockNumber={blockNumber} setBlockNumber={setBlockNumber}/>
      { loading ? 
      <p className='text-xl text-center w-full py-2'>Loading ...</p>
      :
      <BlockInfo blockInfo={blockInfo}/>
      }
    </>
  )
}

export default App;
