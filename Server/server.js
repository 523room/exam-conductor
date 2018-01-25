var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require('path');
const _ = require('lodash');
const port = process.env.PORT || 3000;

var que = [];
var o1 = [];
var o2 = [];
var o3 = [];
var o4 = [];

var tque = [];
var to1 = [];
var to2 = [];
var to3 = [];
var to4 = [];

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../Public/Client/client.html'));
});

http.listen(('172.14.0.211', port), function(){
  console.log(`Listening on Address.${('172.14.0.211', port)}`);
});

io.on('connection', function(socket){
  console.log('A user is connected.');
  socket.emit('this', {question: que, option1:o1, option2:o2, option3:o3, option4:o4});


  socket.on('submission', function(data){
    que = data.question;
    o1 = data.option1;
    o2 = data.option2;
    o3 = data.option3;
    o4 = data.option4;
    console.log('questions :', que);
    console.log('op1 :', o1);
    console.log('op2', o2);
    console.log('op3', o3);
    console.log('op4', o4);
  });

  io.on('disconnect', function(data) {
    console.log('A User is disconnected');
  });
});
