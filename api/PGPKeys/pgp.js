const express = require('express');
const router = express();
router.use(express.json());

const pgp = require('../../util/pgpUtil');

router.get('/generateKeyPair', (req, res) => {
    pgp.generateKeyPair();
    res.status(200).send("New Keypair generated");  
});

router.get('/getPrivateKey', async (req, res) => {
    res.status(200).send(pgp.getPrivateKey());   
    console.log(pgp.getPrivateKey());
}); 

router.get('/getPublicKey', async (req, res) => {
    await res.status(200).send( pgp.getPublicKey());
    console.log(await pgp.getPublicKey());
}); 

router.post('/getEncryptedText', async (req, res,next) => {
    const text = req.body.text.toString();
    console.log(req.body.email);
    res.status(200).send(pgp.getEncryptedString(text));
}); 

router.post('/getDecryptedString', async (req, res,next) => {
    const encryptedText = req.body.text.toString();
    console.log(req.body.text);
    res.status(200).send(pgp.getDecryptedString(encryptedText));
}); 

module.exports = router;