// const { ethers } = require("ethers");

async function main() {
  
    const StableCoin = await ethers.getContractFactory("StableCoin");
    const stableCoin = await StableCoin.deploy();
    console.log("Stable Coin deployed to address :",stableCoin.address);


    const EtherVault = await ethers.getContractFactory("EtherVault");
    const etherVault = await EtherVault.deploy(stableCoin.address);
    console.log("Vault smart contract deployed to address:", etherVault.address);

 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });