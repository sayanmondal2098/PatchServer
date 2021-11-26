const express = require('express');
const router = express();

const getFileList = require('./filecontroller');

router.get('/list',getFileList.getFileList ,(req, res) => {
    // getFileList(req, res);     // this is the same as above after removing the getFileList from function variable
    console.log('File List Sent');
}); 

module.exports = router;