const WebSocket = require('ws');
const files = require('fs');

const wss = new WebSocket.Server({
    port: 5002
}, function () {
    console.log('WebSocket Server is running on port 8080');
});