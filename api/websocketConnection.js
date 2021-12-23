const WebSocket = require('ws');
// const http = require('http');
// const files = require('fs');



const wss = new WebSocket.Server({
    port: 5002
}, function () {
    wss.on('connection', function connection(ws) {  
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });
        ws.send('something');
    });
    console.log('WebSocket Server is running on port 5002');
});

console.log(wss);