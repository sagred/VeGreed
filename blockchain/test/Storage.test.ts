import { ethers } from 'hardhat';
import { HttpNetworkConfig } from 'hardhat/types';
import { createWallet } from '@vechain/hardhat-vechain/dist/helpers/createWallet';
import { createProvider } from '@vechain/hardhat-vechain/dist/helpers/createProvider';
import { ClausesBuilder } from '@vechain/hardhat-vechain/dist/clausesBuilder';
const { expect } = require('chai');

describe('Storage', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deploy() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const Storage = await ethers.getContractFactory('Storage');
        const storage = await Storage.deploy();
        const abiArray = Storage.interface['fragments'];
        const abi = JSON.stringify(abiArray);

        return { storage, owner, otherAccount, abi };
    }

    describe('Deployment', function () {
        it('Default value is 0', async function () {
            const { storage, owner, otherAccount } = await deploy();

            const res = await storage.retrieve();

            expect(res).to.equal(0);
        });

        it('Store/Retrieve is working', async function () {
            const { storage, owner, otherAccount } = await deploy();

            await storage.store(15);
            expect(await storage.retrieve()).to.equal(15);
        });

        it('Should emit StoreEvent', async function () {
            const { storage, owner, otherAccount } = await deploy();
            await expect(storage.store(42)).to.emit(storage, 'StoreEvent');
        });

        it('Should revert when > 100', async function () {
            const { storage, owner, otherAccount } = await deploy();
            await expect(storage.store(101)).to.be.reverted;
        });

        it('Should revert when > 100 with permission denied', async function () {
            const { storage, owner, otherAccount } = await deploy();
            await expect(storage.store(101)).to.be.revertedWith('Number must be < 100');
        });
    });
});
