const mysql = require('mysql');

var connection = mysql.createConnection({
	host: "sports-betting-db.cmfnv8yxq0ub.us-east-2.rds.amazonaws.com",
	user: "fintech2021",
	password: "fintech2021!",
	port: "3306",
	database: "main"
});

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Create new user (newuser), Create new bet round (newround), Attach bet (attachbet)? ", function(options) {
	if (options == 'newuser'){
		rl.question("What is your first name? ", function(first_name) {
			rl.question("What is your last name? ", function(last_name) {
				rl.question("What is your email address? ", function(email) {
					rl.question("What is your metamask address? ", function(metamask) {
						rl.close();
						connection.connect(function(err) {
							if (err) {
								console.error("database connection failed: " + err.stack);
								return;
							}
							console.log("connected to database");
							
							var sql = `INSERT INTO users (first_name, last_name, email, metamask_address) VALUES ('${first_name}', '${last_name}', '${email}', '${metamask}')`;
						
							connection.query(sql, function (err, result) {
								if (err) {
									console.error("database connection failed: " + err.stack);
									return;
								}
								console.log("1 record inserted");
							});
						
							connection.query( "SELECT * FROM users", function (err, result, fields) {
								if (err) {
									console.error("database connection failed: " + err.stack);
									return;
								}
								console.log(result);
							});
						
							connection.end();
						});
						
					});
				});
			});
		});
	} else if (options == 'newround') {
		rl.question("What is team 1 name? ", function(team1_name) {
			rl.question("What is team 2 name? ", function(team2_name) {
				rl.close();
				connection.connect(function(err) {
					if (err) {
						console.error("database connection failed: " + err.stack);
						return;
					}
					console.log("connected to database");
					
					var sql = `INSERT INTO betting_rounds (team1, team2, team1_total, team2_total) VALUES ('${team1_name}', '${team2_name}', '0', '0')`;
					var sql1 = `INSERT INTO group_bets (team1, team2, bet_value, bet_time, team1_total, team2_total) VALUES ('${team1_name}', '${team2_name}', '0', new Date(Date.time()).toISOString().slice(0, 19).replace('T', ' '),'0', '0')`;

					
					connection.query(sql, function (err, result) {
						if (err) {
							console.error("database connection failed: " + err.stack);
							return;
						}
						console.log("1 record inserted");
					});
				
					connection.query( "SELECT * FROM betting_rounds", function (err, result, fields) {
						if (err) {
							console.error("database connection failed: " + err.stack);
							return;
						}
						console.log(result);
					});
				
					connection.end();
				});
			});
		});
	} else if (options == 'attachbet') {
		rl.question("What is your user id? ", function(userid) {
			rl.question("What is the betting id? ", function(roundid) {
				rl.question("What team do you bet on (team1 or team2)? ", function(teamid) {
					if (teamid == "team1" || teamid == "team2") {
						rl.question("How much do you bet? ", function(amount) {
							rl.close();
							connection.connect(function(err) {
								if (err) {
									console.error("database connection failed: " + err.stack);
									return;
								}
								console.log("connected to database");
								
								var sql = `UPDATE betting_rounds SET ${teamid}_total = ${teamid}_total + ${amount} WHERE roundid=${roundid}`;
								var sql1 = `INSERT INTO user_bets (userid, roundid, team_choice, bet_total) VALUES ('${userid}', '${roundid}', '${teamid}', '${amount}')`;
									if (teamid == "team1") {
										var sql2 = `INSERT INTO group_bets (team1, team2, bet_value, bet_time, team1_total, team2_total) VALUES ('${team1_name}', '${team2_name}','${amount}' , new Date(Date.time()).toISOString().slice(0, 19).replace('T', ' '),'${amount}+team1_total', '0')`;
									} else {
										var sql2 = `INSERT INTO group_bets (team1, team2, bet_value, bet_time, team1_total, team2_total) VALUES ('${team1_name}', '${team2_name}', '${amount}', new Date(Date.time()).toISOString().slice(0, 19).replace('T', ' '),'0', '${amount}+team1_total')`;
									}	
								connection.query(sql, function (err, result) {
									if (err) {
										console.error("database write failed: " + err.stack);
										return;
									}
									console.log("1 record inserted");
								});
							
								connection.query(sql1, function (err, result) {
									if (err) {
										console.error("database write failed: " + err.stack);
										return;
									}
									console.log("1 record inserted");
								});

								connection.query( "SELECT * FROM betting_rounds", function (err, result, fields) {
									if (err) {
										console.error("database connection failed: " + err.stack);
										return;
									}
									console.log(result);
								});
							
								connection.query( "SELECT * FROM user_bets", function (err, result, fields) {
									if (err) {
										console.error("database connection failed: " + err.stack);
										return;
									}
									console.log(result);
								});

								connection.end();
							});
						});
					} else {
						console.log("not valid user! Please select team1 or team2");
						rl.close();
					}
				});
			});
		});
	} else {
		console.log("not valid option!");
		rl.close();
	}
	
});



//


