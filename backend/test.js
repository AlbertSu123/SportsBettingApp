const mysql = require('mysql');
var express = require('express');
var http = require('http');
var path = require("path");
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");

var connection = mysql.createConnection({
	host: "sports-betting-db.cmfnv8yxq0ub.us-east-2.rds.amazonaws.com",
	user: "fintech2021",
	password: "fintech2021!",
	port: "3306",
	database: "main"
});

var app = express();
var server = http.createServer(app);
const limiter = rateLimit({
    windowMs: 15 * 1000, // 15 secponds
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../frontend')));
app.use(helmet());
app.use(limiter);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'../frontend/test.html'));
});

console.log("init");

// Insert new user
app.post('/addplayer', function(req,res){
    var sql = `INSERT INTO users (first_name, last_name, email, metamask_address) VALUES ('${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${req.body.maddr}')`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.error("database connection failed: " + err.stack);
        }
        console.log("1 record inserted");
        res.send("New player has been added" + req.body.firstname + " " + req.body.lastname);
    });
});

// Close DB Connection
app.get('/close', function(req,res){
    connection.end(function(err) {
        // The connection is terminated now
        if (err) {
            res.send('There is some error in closing the database');
            return console.error(err.message);
        }
        console.log('Closing the database connection.');
        res.send('Database connection successfully closed');
    });
});


server.listen(3000,function(){ 
    console.log("Server listening on port: 3000");
});