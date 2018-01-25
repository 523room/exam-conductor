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

  console.log(`${req.method} ${req.url}`);

  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) pathname += '/index' + ext;

    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });


}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);

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
