const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();
const port = 3001;

// Middleware to parse POST request body
app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send("end point");
});

app.post('/run-zokrates', (req, res) => {
    const { id, providerId, address } = req.body;
    console.log(id, providerId, address)
    const secret = "safkjhk27813yjkasFIU2Y8RH"
    runZokratesCommands(12334, providerId, address, 123, (err, proof) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err.message);
        }
        res.send(proof);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

function generateRandomNumber() {
    let randomNumberString = '';
    for (let i = 0; i < 10; i++) {
        let num = Math.floor(Math.random() * 10);
        randomNumberString += num.toString();
    }
    return Number(randomNumberString);
}


function runZokratesCommands(value1, value2, value3, value4, callback) {
    const commands = [
        'zokrates compile -i root.zok',
        'zokrates setup',
        `zokrates compute-witness -a ${generateRandomNumber()} ${generateRandomNumber()} ${generateRandomNumber()} ${generateRandomNumber()}`,
        'zokrates generate-proof',
    ];

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
