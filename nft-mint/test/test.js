const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const CounterStrike = await ethers.getContractFactory("CounterStrike");
    const counterstrike = await CounterStrike.deploy();
    await counterstrike.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await counterstrike.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await counterstrike.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await counterstrike.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect(await counterstrike.isContentOwned(metadataURI)).to.equal(true);
  });

  it("Should only mint 38 NFTs", async function () {
    const CounterStrike = await ethers.getContractFactory("CounterStrike");
    const counterstrike = await CounterStrike.deploy();
    await counterstrike.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    
    for(let i=0; i<39; i++) {
      const newlyMintedToken = await counterstrike.payToMint(recipient, 't' + i, { value: ethers.utils.parseEther('0.05') });
      // wait until the transaction is mined
      await newlyMintedToken.wait();
    }
    expect(counterstrike.payToMint(recipient, 'finalTest', { value: ethers.utils.parseEther('0.05') })).to.be.reverted;
  });
});
