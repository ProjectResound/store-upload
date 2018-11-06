const express = require('express');
const path = require('path');
const enforce = require('express-sslify');
const port = process.env.PORT || 8000;
const app = express();

// Force https requests
app.use(enforce.HTTPS({ trustProtoHeader: true }))
 // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
app.use(express.static(__dirname + '/dist'));
 // send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});
app.listen(port);
