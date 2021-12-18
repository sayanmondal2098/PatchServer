const NodeRSA = require('node-rsa');
const fs = require('fs');
const { get } = require('express/lib/response');
const { format } = require('path');
const KEY_FILE_PATH = process.env.KEY_FILE_PATH;

const key = new NodeRSA({b: 2048});


var publicKeyString  = '';
var privateKeyString = '';
const generateKeyPair = () => {
    key.generateKeyPair();
    var publicKey = key.exportKey('public'); // returns the public key in PEM format;
    var privateKey = key.exportKey('private'); // returns the private key in PEM format;
    console.log("=== Generating New Key Pair ===");
    console.log(publicKey);
    console.log(privateKey);
    try {
        fs.writeFile(`${KEY_FILE_PATH}public.key`, publicKey);
        fs.writeFile(`${KEY_FILE_PATH}private.key`, privateKey);
    } catch (error) {
        console.log(error);
    }
}

// get public key 
const  getPublicKey = () => {
    fs.readFile(`${KEY_FILE_PATH}public.key`,(err, data) => {
        if (err){
            console.error(err);
            return;
        }
        console.log(data.toString());
        publicKeyString += data;
        return data.toString();
        
    });
}

//get private key
const getPrivateKey = () => {

    fs.readFile(`${KEY_FILE_PATH}private.key`,  (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        console.log(data.toString());
        privateKeyString += data.toString();
        return data;        
    });
}



//public key encrypt

const getEncryptedString = (req) => {
    key.setOptions({encryptionScheme: 'pkcs1'});
    var TextPubKey = getPublicKey();
    let key_public = new NodeRSA(TextPubKey, 'pkcs8-public');
    let encryptedString = key_public.encrypt(req, 'base64');
    console.log(encryptedString);
    return encryptedString;
} 

const getDecryptedString = (req) => {
    var TextPvtKey = getPrivateKey();
    let key_private = new NodeRSA(TextPvtKey);
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