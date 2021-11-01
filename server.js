const net = require('net');
const port = 1234;
const host = 'localhost';
const server = net.createServer();
server.listen(port, host, () => {
    console.log(`TCP server listening on ${host}:${port}`);
});


let sockets = [];

server.on('connection', (socket) => {
    var clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
    console.log(`new client connected: ${clientAddress}`);
    sockets.push(socket);
    socket.on('data', (data) => {
        console.log(`Client ${clientAddress}: ${data}`);


        // Write the data back to all the connected, the client will receive it as data from the server 
        sockets.forEach((sock) => {
            sock.write(socket.remoteAddress + ':' + socket.remotePort + " said " + data + '\n');
        });
    });
    // Add a 'close' event handler to this instance of socket 

    socket.on('close', (data) => {
        letindex = sockets.findIndex((o) => {
            return o.remoteAddress === socket.remoteAddress && o.remotePort === socket.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        sockets.forEach((sock) => {
            sock.write(`${clientAddress} disconnected\n`);
        });
        console.log(`connection closed: ${clientAddress}`);
    });
    // Add a 'error' event handler to this instance of socket 
    socket.on('error', (err) => {
        console.log(`Error occurred in ${clientAddress}: ${err.message}`);
    });
});