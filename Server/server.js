var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');
const _ = require('lodash');
const port = process.env.PORT || 3000;

var htmlpath = path.join();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../Public/Client/index.html'));
});

http.listen(('172.14.0.211', port), function(){
  console.log(`Listening on Address.${('172.14.0.211', port)}`);
});

io.on('connection', function(socket){
  console.log('A user is connected.');


  io.on('disconnect', function(data) {
    console.log('A User is disconnected');
  });
});
