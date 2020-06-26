const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json());

const runServer = server.listen(3333, () => {
    console.log("Rodando!");
});

module.exports = {
    server,
    runServer
};