const NodeRSA = require('node-rsa');
const fs = require('fs');
const KEY_FILE_PATH = process.env.KEY_FILE_PATH;


const key = new NodeRSA({b: 2048});


const generateKeyPair = () => {
    key.generateKeyPair();
    var publicKey = key.exportKey('public'); // returns the public key in PEM format;
    var privateKey = key.exportKey('private'); // returns the private key in PEM format;
    console.log("=== Generating New Key Pair ===");
    console.log(publicKey);
    console.log(privateKey);
    try {
        fs.writeFileSync(`${KEY_FILE_PATH}public.key`, publicKey);
        fs.writeFileSync(`${KEY_FILE_PATH}private.key`, privateKey);
    } catch (error) {
        console.log(error);
    }
}

// get public key 
const getPublicKey = () => {
    fs.readFileSync(`${KEY_FILE_PATH}public.key`, 'utf8', (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        console.log(data);
        return data;
    });
}

//get private key
const getPrivateKey = () => {
    var string = '';
    fs.readFileSync(`${KEY_FILE_PATH}private.key`, 'utf8', (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        console.log(data);
        string += data;
        console.log(data);
        key.importKey(keyData, 'pkcs8');
        
    });
}



//public key encrypt

const getEncryptedString = (req) => {
    let key_public = new NodeRSA(getPublicKey());
    let encryptedString = key_public.encrypt(req, 'base64');
    console.log(encryptedString);
    return encryptedString;
} 

const getDecryptedString = (req) => {

    let key_private = new NodeRSA(getPrivateKey());
    let decryptedString = key_private.decrypt(req, 'utf8');
    console.log(decryptedString);
    return decryptedString;
}

module.exports = {  
    generateKeyPair,    // generate key pair
    getPublicKey,
    getPrivateKey,
    getEncryptedString,
    getDecryptedString
}