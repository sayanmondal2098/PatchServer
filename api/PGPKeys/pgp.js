const express = require('express');
const router = express.Router();

const bodyParser = require("body-parser");


const pgp = require('../../util/pgpUtil');

router.get('/getPrivateKey', (req, res) => {
    res.status(200).send(pgp.getPrivateKey());   
    console.log(pgp.getPrivateKey());
}); 

router.get('/getPublicKey', (req, res) => {
    res.status(200).send(pgp.getPublicKey());
    console.log(pgp.getPublicKey());
}); 

router.post('/getEncryptedText', (req, res,next) => {
    // res.status(200).send(pgp.getEncryptedString(req.body));
    {
        email: req.body
    }
    console.log(req.body);
    res.status(200).send('Hello World');
}); 

module.exports = router;