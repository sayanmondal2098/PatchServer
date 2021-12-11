const NodeRSA = require('node-rsa');

const key = new NodeRSA({b: 2048});
var publicKey = key.exportKey('public');
var privateKey = key.exportKey('private');

// console.log(publicKey + '\n' + privateKey);

// get public key 
const getPublicKey = () => {
    return publicKey;
}

//get private key
const getPrivateKey = () => {
    return privateKey;
}

let key_private = new NodeRSA(privateKey);
let key_public = new NodeRSA(publicKey);

//public key encrypt


const getEncryptedString = (res,req) => {
    let encryptedString = key_public.encrypt(req, 'base64');
    console.log(encryptedString);
    return encryptedString;
} 

const getDecryptedString = (res,req) => {
    let decryptedString = key_private.decrypt(req, 'utf8');
    console.log(decryptedString);
    return decryptedString;
}

module.exports = {  
    getPublicKey,
    getPrivateKey,
    getEncryptedString,
    getDecryptedString
}