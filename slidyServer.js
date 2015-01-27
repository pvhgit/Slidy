// ---- Sample slidy ------
// ---- Author: Prashant Hedaoo

var request = require("request");
var express = require("express");
var app = express();
var port = 3700;

// ---------------- Web server -----------------------

app.set('views', __dirname + '/public');
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('slidy.ejs');
});

var io = require('socket.io').listen(app.listen(port, "0.0.0.0"));

// Socket connection handler from front-end
io.sockets.on('connection', function (socket) {

	request('http://ruzickjc-test.apigee.net/sears1/deals', function (error, response, body) {
	    if (error) {
	        res.send(error);
	    } else {
			socket.emit('deals_list', body);
	    }
	});
});

console.log("Listening on port " + port);
