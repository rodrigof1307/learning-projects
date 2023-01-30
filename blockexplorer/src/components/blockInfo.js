import TransactionInfo from "./transactionInfo"

function BlockInfo({blockInfo}) {

  if(blockInfo) {
    console.log(blockInfo.transactions[0].value)

    const baseFee = parseFloat(blockInfo.baseFeePerGas)/10**9
    const date = new Date(blockInfo.timestamp * 1000)
    return (
      <div className="px-5 py-2 w-full h-full">
        <p className='text-xl text-left py-2'>{"Base Fee per Gas: " + baseFee.toFixed(3) + ' Gwei'}</p>
        <p className='text-xl text-left py-2'>{"Gas Limit: " + blockInfo.gasLimit}</p>
        <p className='text-xl text-left py-2'>{`Gas Used: ${blockInfo.gasUsed} (${(blockInfo.gasUsed/blockInfo.gasLimit*100).toFixed(3)} %) `}</p>
        <p className='text-xl text-left py-2'>{"Miner: " + blockInfo.miner}</p>
        <p className='text-xl text-left py-2'>{"Timestamp: " + date.toUTCString()}</p>
        <h3 className='text-2xl text-left py-2 font-bold'>Transactions</h3>
        <div className='flex flex-row justify-between items-center'>
          <p className="text-l w-1/3 font-medium">Hash</p>
          <p className="text-l w-1/4 font-medium pl-4">From</p>
          <p className="text-l w-1/4 font-medium pl-4">To</p>
          <p className="text-l w-1/6 font-medium">Value</p>
        </div>
        {blockInfo.transactions.map((transaction) => (
          <TransactionInfo transactionInfo={transaction} key={transaction.hash}/>
        ))}
      </div>
    )
  }

  return (
    <p className='text-xl text-center w-full py-2'>This block hasn't been mined yet!</p>
  )

}

export default BlockInfo;
