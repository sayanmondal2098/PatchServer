const fs = require('fs');
var string = '';
fs.readFile('../keystore/private.key', 'utf8', (err, data) => {
    if (err){
        console.error(err);
        
    }
    string += data;
    console.log(string);
});