const express = require('express');
const router = express();

const getFileList = require('./filecontroller');

router.get('/list', (req, res) => {
    getFileList.getFileList(req, res);     // this is the same as above after removing the getFileList from function variable
    console.log('File List Sent');
}); 

router.get('/list/:name',(req, res) => {
    getFileList.getFileDownload (req, res);     // this is the same as above after removing the getFileDownload from function variable
    console.log('File Downloaded : '+req.params.name);
}); 

module.exports = router;