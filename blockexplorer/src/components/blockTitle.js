function BlockTitle({blockNumber, setBlockNumber}) {
  const previousBlock = () => (setBlockNumber((currentBlock) => currentBlock - 1))
  const nextBlock = () => (setBlockNumber((currentBlock) => currentBlock + 1))

  return (
    <div className="flex flex-row justify-between items-center mx-auto bg-gray-200 shadow border p-6">
      <button className="w-12 h-12 rounded-md flex flex-row justify-center items-center border-black border-2 font-semibold" 
        onClick={previousBlock}>
          {"<"}
      </button>
      <p className="text-3xl text-gray-700 font-bold m-0">
        {"Block Number: " + blockNumber}
      </p>
      <button className="w-12 h-12 rounded-md flex flex-row justify-center items-center border-black border-2 font-semibold" 
        onClick={nextBlock}>
          {">"}
      </button>
    </div>
  )
}

export default BlockTitle;
