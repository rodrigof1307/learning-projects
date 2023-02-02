# Escrow dApp

This project was done as part of week five at the "Ethereum Developer Bootcamp" from Alchemy University ( https://university.alchemy.com/overview/ethereum ). It's goal was to develop a decentralized application that allowed users to use leverage services to mediate the transfer between the user and a beneficiary account. I also employed a 1 % tax that is send to my address.

During this project a simple React.js app styled with Bootstrap used ethers.js to deploy a smart contract developed and tested Solidity and Hardhat.

### Execution Instructions

1. Open up a terminal in the `/hardhat` folder
2. Run `npm install` to install all the dependencies
3. Run `npx hardhat test test/test.js` if you wish to test the Solidity smart contract
4. Go to the `/app` folder
5. Run `npm install` to install all the dependencies
6. Run `npm start` to use the dApp!

### Execution Notes

This dApp can be deployed on a local node, a Testnet or the Mainnet. The option I recommend is to use the Goerli Testnet.

In order to use the Goerli Testnet do the following 

1. Open the dApp on a browser that has a browser wallet extension. Certify that your browser wallets are on the Goerli Network and have Goerli Ether.
2. Accept the connection between the account you want to send money with and the dApp. 
3. Fill the arbiter, beneficiary and amount inputs
4. Submit the transaction and approve it in your browser wallet.
5. Change to the arbiter account on your browser wallet.
6. Connect the arbiter account with the dApp.
7. Approve the contract so that the beneficiary receives its value.