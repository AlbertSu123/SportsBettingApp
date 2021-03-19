const mysql = require('mysql');

var connection = mysql.createConnection({
	host: "sports-betting-db.cmfnv8yxq0ub.us-east-2.rds.amazonaws.com",
	user: "fintech2021",
	password: "fintech2021!",
	port: "3306",
	database: "main"
});

connection.connect(function(err) {
	if (err) {
		console.error("database connection failed: " + err.stack);
		return;
	}
	console.log("connected to database");

	var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 51 Revisited')";

	connection.query(sql, function (err, result) {
		if (err) {
			console.error("database connection failed: " + err.stack);
			return;
		}
		console.log("1 record inserted");
	});

	connection.query( "SELECT * FROM customers", function (err, result, fields) {
		if (err) {
			console.error("database connection failed: " + err.stack);
			return;
		}
		console.log(result);
	});

});

//connection.end();


