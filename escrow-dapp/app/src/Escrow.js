import { useState } from "react";

export default function Escrow({ address, arbiter, beneficiary, contract, value, handleApprove}) {
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  contract.on('Approved', () => {
    setIsApproved(true)
    setIsLoading(false);
  });

  return (
    <div className="card card-body p-4 py-5">      
      <div className='w-100 d-flex justify-content-between align-items-end'>
        <div className='w-25'>
          <label class="form-label">{"Arbiter Address: " + arbiter}</label>
        </div>

        <div className='w-25'>
          <label class="form-label">{"Beneficiary Address: " + beneficiary}</label>
        </div>

        <div className='w-25'>
          <label for="arbiter" class="form-label">{"Deposit Amount (in Wei): " + value}</label>
        </div>

      </div>
      {!isApproved ?
      <div className="btn btn-primary w-25 mx-auto mt-4 fs-5 fw-semibold"
        id={address}
        onClick={(e) => {
          e.preventDefault();
          setIsLoading(true);
          handleApprove();
        }}>
        {isLoading ? 
        <div class="spinner-border spinner-border-md my-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div> 
        : 
        <p className="m-0">Approve</p>
        }
      </div>
      :
      <h3 className="text-success fs-3 fw-semibold mx-auto mt-4">Contract Approved!</h3>
      }
    </div>
  );
}
