const fs = require('fs');
const directoryPath = process.env.MOCK_DIRECTORY_PATH;

const getFileList = (req, res) => {
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

const getFileDownload = (req, res) => {
    var fileName = req.params.name;
    var filePath = directoryPath + fileName;

    res.download(filePath, fileName, (err) => { 
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'Unable to send Files '+ err,
            })
        }
    })
};

module.exports = {  
    getFileList,
    getFileDownload
};