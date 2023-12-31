import { ethers } from 'hardhat';

const CONTRACT_NAME = 'SimpleProductNFT'; // Declare a global variable for the contract name

async function main() {
    const Storage = await ethers.getContractFactory(CONTRACT_NAME); // Use the global variable
    const storage = await Storage.deploy();

    console.log(
        `${CONTRACT_NAME} deployed to ${await storage.getAddress()}` // Use the global variable
    );

    const storage = Storage
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
