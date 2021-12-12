const express = require('express');
const router = express();
router.use(express.json());

const pgp = require('../../util/pgpUtil');

router.get('/generateKeyPair', (req, res) => {
    pgp.generateKeyPair();
    res.status(200).send("New Keypair generated");  
});

router.get('/getPrivateKey',  (req, res) => {
    const data =  pgp.getPrivateKey();
    require('util').promisify(setTimeout)(1000);
    res.status(200).send(data);   
    console.log(data);
}); 

router.get('/getPublicKey',  (req, res) => {
    const data =   pgp.getPublicKey();
    require('util').promisify(setTimeout)(1000);
    res.status(200).send( data);
    console.log(data);
}); 

router.post('/getEncryptedText',  (req, res,next) => {
    const text = req.body.text.toString();
    const data = pgp.getEncryptedString(text)
    console.log(req.body.text);
    res.status(200).send(data);
}); 

router.post('/getDecryptedString', async (req, res,next) => {
    const encryptedText = req.body.text.toString();
    const data =  pgp.getEncryptedString(text)
    console.log(req.body.text);
    res.status(200).send(data);
}); 

module.exports = router;