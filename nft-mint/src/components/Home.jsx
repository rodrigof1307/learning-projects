import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import CounterStrike from '../artifacts/contracts/MyNFT.sol/CounterStrike.json';

let contractAddress;
let provider;
let signer;
let contract;

if(window.ethereum) {

  contractAddress = '0x049c52922e5DE3b0B26A7BCd2E565d52B540C7c9';

  provider = new ethers.providers.Web3Provider(window.ethereum);

  // get the end user
  signer = provider.getSigner();

  // get the smart contract
  contract = new ethers.Contract(contractAddress, CounterStrike.abi, signer);

}

function Home() {

  const availableNFTs = 38;

  return (
    <div className='w-100 m-0'>
      <h1 className='w-100 text-center py-4'>Counter Strike NFT Collection</h1>
      <p className='w-100 text-center fst-italic pb-4 text-danger'>{"This NFT collection was created as part of an educational project and it's not meant to be minted on Ethereum's mainnet.\nAll content rights reserved to Steam"}</p>
      <div className="w-100 row row-cols-4 ms-0" >
        {Array(availableNFTs)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="col-3 px-0 d-flex justify-content-center align-items-center">
              <NFTImage tokenId={i}/>
            </div>
          ))}
      </div>
    </div>
  );
}

function NFTImage({ tokenId }) {
  const contentId = 'QmRTfYyCw71WSjUw4TFdDL8XEjqPNkgxQCQ9u4qcd3y4eV';
  const metadataURI = `${contentId}/skin${tokenId}.json`;

  const [loading, setLoading] = useState(true);
  const [isMinted, setIsMinted] = useState(false);
  const [data, setData] = useState({});
  const [mintLoading, setMintLoading] = useState(false);

  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    fetch("https://ipfs.io/ipfs/"+metadataURI).then(response => response.json())
    .then(fetchedData => {
      setData(fetchedData)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    setIsMinted(result);
    setLoading(false);
    setMintLoading(false)
  };

  const mintToken = async () => {
    setMintLoading(true)
    const result = await contract.payToMint(signer.getAddress(), metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });
    await result.wait();
    getMintedStatus();
  };

  if(loading) {
    return (
      <div className="card mb-5 mx-auto" style={{ width: '18rem', height:'18rem' }}>
        <div className="card-body d-flex justify-content-center align-items-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  } 

  return (
    <div className="card mb-5 mx-auto" style={{ width: '19rem', height:'18rem' }}>
        {!isMinted ? (
          <div className='d-flex flex-column justify-content-evenly align-items-center h-100'>
            <div style={{ height:'8rem', width: '14rem'}} className='mx-auto d-flex justify-content-center align-items-center'>
              <h1 className='text-center fw-bold'>?</h1>
            </div>
            <div style={{height: '3rem'}} className='d-flex justify-content-center align-items-center'>
              <h5 className="card-title">
                ID #{tokenId}
              </h5>
            </div>
            { mintLoading ?
            <button className="btn btn-primary" disabled>
              Loading...
            </button>
            :
            <button className="btn btn-primary" onClick={mintToken}>
              Mint
            </button>
            }
          </div>
        ) : (
          <div className='d-flex flex-column justify-content-evenly align-items-center h-100'>
            <img src={data.image} style={{ height:'8rem', width: '16rem', objectFit: 'contain'}} className='mx-auto'/>
            <div style={{height: '3rem'}} className='d-flex justify-content-center align-items-center'>
              <h5 className="card-title">
                ID #{tokenId} - {data.name}
              </h5>
            </div>
            <button className="btn btn-secondary" disabled>
              Taken!
            </button>
          </div>
        )}
    </div>
  );
}

export default Home;
