const express = require('express');
const httpServer = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const { thorify } = require('thorify');
const { Framework } = require('@vechain/connex-framework');
const { Driver, SimpleNet, SimpleWallet } = require('@vechain/connex-driver');
const { ProviderWeb3 } = require('@vechain/web3-providers-connex');

const { abi } = require("thor-devkit")

console.log(abi)
const net = new SimpleNet('https://vethor-node-test.vechaindev.com/')
const wallet = new SimpleWallet()

//const privateKey = mnemonic.derivePrivateKey(words)
// import private key if needed
wallet.import("bbab27da64aa135197159899e15b0b912e440340240393c16853f1b8a0aa9faa")


const CONTRACT_ADDRESS = '0x0CB0233384A5152321Ce748D316d2835245392B5';
const run = async () => {
    //const contract = new web5.eth.Contract(contractABI, contractAddress);
    //const nftContract = connex.thor.account(contractAddress)

    const abiTokenURI = {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }

    const driver = await Driver.connect(net, wallet)
    const connex = new Framework(driver)

    const result = await connex.thor
        .account(CONTRACT_ADDRESS)
        .method(abiTokenURI).call(20)

    console.log(result)

    console.log("ello")

    console.log(result)
}
run()


// async function fetchNFTs(ownerAddress) {
//     const totalOwned = await contract.methods.balanceOf(ownerAddress).call();
//     const nftDetails = [];

//     // Assuming the contract implements the ERC-721 enumerable extension
//     for (let i = 0; i < totalOwned; i++) {
//         const tokenId = await contract.methods.tokenOfOwnerByIndex(ownerAddress, i).call();
//         const uri = await contract.methods.tokenURI(tokenId).call();
//         nftDetails.push({
//             tokenId: Number(tokenId),
//             uri
//         });
//     }

//     return nftDetails;
// }

// const ownerAddress = '0x3c897d3b12a828A33CD0467a131459DB9b5548A1';
// fetchNFTs(ownerAddress).then(console.log).catch(console.error);


// const senderAddress = '0x3c897d3b12a828A33CD0467a131459DB9b5548A1'; // Replace with the Ethereum address that will mint the NFT
// const privateKey = 'bbab27da64aa135197159899e15b0b912e440340240393c16853f1b8a0aa9faa'; // Replace with the private key corresponding to the sender's address

// const tokenURI = 'https://yourdomain.com/path_to_token_metadata.json'; // This should be a valid URL pointing to the NFT's metadata

// const clause = contract.methods.createToken(tokenURI).asClause();

// const signingService = connex.vendor.sign('tx', [{
//     ...clause,
//     value: 0, // No VET transfer
//     to: contractAddress
// }]);

// signingService.request()
//     .then(txResponse => {
//         if (txResponse && txResponse.txid) {
//             console.log('Transaction ID:', txResponse.txid);
//         }
//     })
//     .catch(error => console.error('Error:', error));


const web3 = thorify(new Web3());




const createVeChainKeypair = () => {
    const account = web3.eth.accounts.create();
    return {
        address: account.address,
        privateKey: account.privateKey
    };
}

const PORT = 4000


const app = express();

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

const server = httpServer.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

server.listen(PORT, () => {
    console.log("server started");
});



app.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
});

io.on("connection", (socket) => {
    socket.on("imagine", async ({ prompt, id }, callback) => {

        console.log(prompt)
        try {
            io.to(socket.id).emit("imageURL", msg.attachments[0].url)
        } catch (error) {
            io.to(socket.id).emit("error", "Can't fetch image")
        }
    })


    socket.on("publicKeyFromUser", async ({ publicKey, id, parsedData }, callback) => {
        console.log(publicKey, id)
        io.to(id).emit("publicKeyFromUser", publicKey)

        const iod = {
            io: io,
            userId: id,
            socketId: socket.id
        }

        runZokratesCommands(12334, publicKey, 163463426234, 123, iod, (err, proof) => {
            if (err) {
                console.log(err)
                io.to(id).emit("status", "Error Creating proof");
                io.to(socket.id).emit("status", "Error Creating proof");

            }
            io.to(socket.id).emit("proofToUser", parsedData);
            io.to(id).emit("status", "Proof Created and send to user");
        });
    })

    socket.on("createCredentials", async ({ parsedData }, callback) => {
        const { address, privateKey } = createVeChainKeypair();

        callback({ address, privateKey, parsedData });

    })

    socket.on("Transfer", async ({ from, to, tokenId }, callback) => {

        console.log(tokenId, from, to)
        const abiTransfer = {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }



        const driver = await Driver.connect(net, wallet)
        const connex = new Framework(driver)
        const result = await connex.thor
            .account(CONTRACT_ADDRESS)
            .method(abiTransfer).call(from, to, tokenId)


        console.log(result)

    })


})


function generateRandomNumber() {
    let randomNumberString = '';
    for (let i = 0; i < 10; i++) {
        let num = Math.floor(Math.random() * 10);
        randomNumberString += num.toString();
    }
    return Number(randomNumberString);
}


function runZokratesCommands(value1, value2, value3, value4, iod, callback) {
    const commands = [
        'zokrates compile -i root.zok',
        'zokrates setup',
        `zokrates compute-witness -a ${generateRandomNumber()} ${generateRandomNumber()} ${generateRandomNumber()} ${generateRandomNumber()}`,
        'zokrates generate-proof',
    ];

    const { io, userId, socketId } = iod

    io.to(userId).emit("status", `fetching claim`);
    io.to(socketId).emit("status", `fetching claim`);


    let i = 0;
    function executeCommand() {
        if (i < commands.length) {
            console.log(`Running: ${commands[i]}`);

            exec(commands[i], (error, stdout, stderr) => {
                if (error) {
                    return callback(error);
                }
                if (stderr) {
                    return callback(new Error(stderr));
                }
                console.log(`Stdout: ${stdout}`);
                if (i !== 0) {
                    io.to(userId).emit("status", `${i}: ${stdout.split("...")[0]} `);
                    io.to(socketId).emit("status", `${i}: ${stdout.split("...")[0]} `);
                }

                i++;
                executeCommand();
            });
        } else {
            console.log('All commands have been executed.');
            readProofFile(callback);
        }
    }

    executeCommand();
}

function readProofFile(callback) {
    const filePath = path.resolve('proof.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return callback(err);
        }
        let proof;
        try {
            proof = JSON.parse(data);
        } catch (parseError) {
            return callback(parseError);
        }
        callback(null, proof);
    });
}