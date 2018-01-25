var express = require('express');
var app = express();

const path = require('path');
const _ = require('lodash');
const port = process.env.PORT || 3000;

var htmlpath = path.join(__dirname, 'html');

app.use(express.static(htmlpath));

var server = app.listen(port, function(){
  var host = 'localhost';
  var pORT = server.address().port;
  console.log(`Listening on http://${host}:${pORT}`);
});

server.on('connection', function(socket) {
  console.log('User is on..');
  socket.on('credentials', function (data) {
    console.log('Username :', data.id);
    console.log('Password :', data.pass);
  });
});
