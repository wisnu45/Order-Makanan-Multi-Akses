var app = require('./app')
var port = process.env.PORT || 3000;
var http = require('http');
var fs = require('fs');


var server = app.listen(port, function() {
  console.log('server listening on port ' + port);
});

//this creates your server and keeps it running
