const express = require('express');
const router = express();
router.use(express.json());

const pgp = require('../../util/pgpUtil');

router.get('/generateKeyPair', (req, res) => {
    pgp.generateKeyPair();
    res.status(200).send("New Keypair generated");  
});

router.get('/getPrivateKey', async (req, res) => {
    const data = await pgp.getPrivateKey();
    res.status(200).send(data);   
    console.log(data);
}); 

router.get('/getPublicKey', async (req, res) => {
    const data = await pgp.getPublicKey();
    res.status(200).send( data);
    console.log(data);
}); 

router.post('/getEncryptedText', async (req, res,next) => {
    const text = req.body.text.toString();
    const data = await pgp.getEncryptedString(text)
    console.log(req.body.email);
    res.status(200).send(data);
}); 

router.post('/getDecryptedString', async (req, res,next) => {
    const encryptedText = req.body.text.toString();
    const data = await pgp.getEncryptedString(text)
    console.log(req.body.text);
    res.status(200).send(data);
}); 

module.exports = router;