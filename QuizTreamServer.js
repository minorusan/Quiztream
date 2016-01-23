//Requiring modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var queries = require('./serverQueries.js');

var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


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

mongodb_connection_string =  "mongodb://localhost:27017/QuiztreamDb";
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
var MongoDB = mongoose.connect(mongodb_connection_string).connection;
MongoDB.on('error', function (err) {
    console.log(err.message);
});
MongoDB.once('open', function () {
    console.log("Connection opened");
});
MongoDB.on('close', function () {
    console.log('Connection closed');
})

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", server_port " + port )
})




queries.serverQueries(app, MongoDB, jwt);

