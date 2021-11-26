const fs = require('fs');
const express = require('express');
const router = express();

const getFileList = (req, res) => {
    const directoryPath = './dummydir/';
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
        res.status(500).send({
            message: 'Unale to send Files'
        });
        }
        let fileList = [];

        files.forEach(file => {
            fileList.push({
                name: file,
                url: directoryPath + file,

            });
    });
    res.status(200).send(fileList);
    });
};

router.get('/list',getFileList ,(req, res) => {
    // getFileList(req, res);     // this is the same as above after removing the getFileList from function variable
    console.log('File List Sent');
}); 

module.exports = router;