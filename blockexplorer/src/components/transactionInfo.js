import { Utils } from "alchemy-sdk";

function TransactionInfo({transactionInfo}) {

  if(transactionInfo) {
    return (
      <div className='flex flex-row justify-between items-center border-black border-2 rounded-sm mb-2'>
        <p className="text-l w-1/3 font-medium">{transactionInfo.hash}</p>
        <p className="text-l w-1/4 font-medium pl-4">{transactionInfo.from}</p>
        <p className="text-l w-1/4 font-medium pl-4">{transactionInfo.to}</p>
        <p className="text-l w-1/6 font-medium">{Utils.formatEther(transactionInfo.value) + ' Ether'}</p>
      </div>
    )
  }

  return (
    <p className='text-xl text-center w-full py-2'>Error reading transaction</p>
  )

}

export default TransactionInfo;
