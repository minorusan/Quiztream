//Requiring modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var queries = require('./serverQueries.js');

var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");


app.use(express.static(path.join(__dirname, '/app')));
app.use(express.static(path.join(__dirname, '/scripts')));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();

});


//Initialising MongoDB connection
var mongoURI = "mongodb://localhost:27017/QuiztreamDb";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function (err) {
    console.log(err.message);
});
MongoDB.once('open', function () {
    console.log("Connection opened");
});
MongoDB.on('close', function () {
    console.log('Connection closed');
})

app.listen(3000, function () {
    console.log('QuizTream server runs on http://localhost:%s', 3000)
})




queries.serverQueries(app, MongoDB, jwt);

