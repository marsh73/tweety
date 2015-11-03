
var fs = require("fs")
var express = require("express");
var bodyParser = require("body-parser");var app = express();
var twitter = require("twitter");
var app = express();
app.use('/', express.static(__dirname + '/build'));

var tw = new twitter({
  consumer_key: "prCDQikzqJmS02SST3pO5SR6E",
  consumer_secret: "KCc9EPMsahqdsCi8gurZ3RYf2FFQmPtUfUl7HqpuivEpnJWI7Z",
  access_token_key: "21160479-6vjib4klnTXY11dGrXjJb8MDEQDrCcMZVVYniFLWI",
  access_token_secret: "j5qjLEteXYt5E8d5WXtN4Z847aAbsRBa0ZlFstR4E5aLc"
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app, tw);
var env_port = process.env.PORT || 3000;
var server = app.listen(env_port, function () {
    console.log("Listening on port %s...", server.address().port);
});



