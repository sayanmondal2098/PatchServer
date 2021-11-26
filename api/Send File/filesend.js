var http = require('http');
var fileSystem = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    var filePath = '.' + request.url;
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {   
        'Content-Type': 'application/octet-stream',
        'Content-Length': stat.size,    //size of the file 
        'Content-Disposition': 'attachment; filename=' + path.basename(filePath)
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers 
    readStream.on('data', function (chunk) {    
        response.write(chunk);
    }   );
    readStream.pipe(response);
}).listen(8080);