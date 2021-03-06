const express = require('express');
const app = express();
const FileList = require('./api/Send File/filesendRouter');
const PgpSec = require('./api/PGPKeys/pgp');

app.use('/listdir', FileList);
app.use('/sec', PgpSec);

app.use('/',(req, res, next) => {
  res.status(200).json({
    "message": "It works!",
    "App Name": app.name,
    "App Host-Port": req.get('host'),
    "App Mode": req.get('env'),
    "App URL": req.protocol + '://' + req.get('host') + req.originalUrl,
    "App Method": req.method,
    "App Path": req.path,
    "App Query": req.query,
    "App Body": req.body
  });
});


app.listen(process.env.OUTPUT_PORT || 5882);
console.log('Server API is running on port 5882 ...');
module.exports = app;