import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './deploy';
import Escrow from './Escrow';
import { FaExchangeAlt } from 'react-icons/fa';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();
  const [isCurrencyEther, setIsCurrencyEther] = useState(true);

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    let value;
    if(isCurrencyEther) {
      value = ethers.utils.parseEther(document.getElementById('ether').value);
    } else {
      value = ethers.BigNumber.from(document.getElementById('wei').value);
    }
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      contract: escrowContract,
      value: value.toString(),
      handleApprove: async () => {
        await approve(escrowContract, signer);
      },
    };

    setEscrows([...escrows, escrow]);
  }

  const toggleCurrency = () => { setIsCurrencyEther(!isCurrencyEther) }

  return (
    <>
      <div className="card card-body m-4 p-5">
        <h1> New Contract </h1>
        
        <div className='w-100 py-5 d-flex justify-content-between align-items-end'>
          <div className='w-25'>
            <label for="arbiter" class="form-label">Arbiter Address</label>
            <input type="text" class="form-control" id="arbiter"/>
          </div>

          <div className='w-25'>
            <label for="beneficiary" class="form-label">Beneficiary Address</label>
            <input type="text" class="form-control" id="beneficiary"/>
          </div>

          {
            isCurrencyEther ?
            <div className='w-25'>
              <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                <label for="ether" class="form-label m-0">Deposit Amount (in Ether)</label>
                <button onClick={toggleCurrency} className='btn'><FaExchangeAlt/></button>
              </div>
              <input type="text" class="form-control" id="ether"/>
            </div>
            :
            <div className='w-25'>
              <div className='d-flex flex-row justify-content-between align-items-center w-100'>
                <label for="wei" class="form-label m-0">Deposit Amount (in Wei)</label>
                <button onClick={toggleCurrency} className='btn m-0'><FaExchangeAlt/></button>
              </div>
              <input type="text" class="form-control" id="wei"/>
            </div>
          }

        </div>

        <div
          className="btn btn-primary w-25 mx-auto fs-5 fw-semibold"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();

            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="card card-body m-4 p-5">
        <h1 className='mb-2'> Existing Contracts </h1>
        
        { escrows.length !== 0 ?
        <div>
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
        :
        <p className='mt-4'>There are no existing contracts</p>
        }
      </div>
    </>
  );
}

export default App;
