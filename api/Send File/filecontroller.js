const fs = require('fs');

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



module.exports = {  
    getFileList
};