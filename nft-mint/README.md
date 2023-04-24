# NFT Mint

This project was done in order to generate a collection of NFTs inspired on CSGO skins that will be used in my NFTRenter App. It's inspired on the following tutorial (https://youtu.be/meTpMP0J5E8). The goal of this project was to allow the user to test and deploy a ERC721 smart contract and afterwards interact with it on its browser to mint NFTs. The NFTs have attributes such as name, collection and an image which are stored in Pinata.

During this project a simple React.js app styled with Bootstrap used ethers.js to deploy a smart contract developed and tested Solidity and Hardhat.

### Execution Instructions

To mint NFTs from the already deployed collection on the Goerli testnet:
1. Run `npm install` to install all the dependencies
2. Run `npm run dev` to run the dApp
3. Open the dApp local host link on a browser that has a browser wallet extension. 
4. Certify that your browser wallets are on the Goerli Network and have Goerli Ether.
5. Accept the connection between the account you want to mint the NFT and the dApp. 
6. Mint an available NFT

If you wish to deploy a new contract I recommend that you watch the previously mentioned video to have a better grasp of the following steps:
1. Run `npm install` to install all the dependencies
2. Customize the contract on `/contracts/MyNFT.sol`
3. Test your contract by altering `test/test.js`
4. Run `npx hardhat test test/test.js` to test the contract
5. Run `touch .env` to create a file that stores the enviroment variables
6. Add a GOERLI_URL and PRIVATE_KEY to the .env file that will be used by hardhat.config.js
7. Alter `scripts/deploy.js` to your contract
8. Run `npx hardhat run scripts/deploy.js --network goerli` to deploy the contract on the Goerli testnet
9. Copy the address that this script logged on the terminal
10. Past the address on line 13 of the `src/components/Home.jsx`
11. On `src/components/Home.jsx` change line 27 to the number of NFTs of your collection
12. On `src/components/Home.jsx` change lines 47 and 48 to your IPFS data
13. Depending on how different the new contract is `src/components/Home.jsx` might need further changes
14. Run `npm run dev` to run the dApp
15. Open the dApp local host link on a browser that has a browser wallet extension. 
16. Certify that your browser wallets are on the Goerli Network and have Goerli Ether.
17. Accept the connection between the account you want to mint the NFT and the dApp. 
18. Mint an available NFT

### Notes

The `info` folder contains .json files that were used to generate the NFTs metadata with Pinata



