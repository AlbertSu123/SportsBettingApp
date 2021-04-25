CREATE DATABASE main;
create table users (
   userid INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(25) NOT NULL,
   last_name VARCHAR(25) NOT NULL,
   email VARCHAR(55) NOT NULL,
   metamask_address VARCHAR(255) NOT NULL,
   PRIMARY KEY ( userid )
);
create table betting_rounds (
   roundid INT NOT NULL AUTO_INCREMENT,
   team1 VARCHAR(25) NOT NULL,
   team2 VARCHAR(25) NOT NULL,
   team1_total FLOAT(10, 2) NOT NULL,
   team2_total FLOAT(10, 2) NOT NULL,
   PRIMARY KEY ( roundid )
);
create table user_bets (
   userid INT NOT NULL,
   roundid INT NOT NULL,
   team_choice VARCHAR(25) NOT NULL,
   bet_total FLOAT(10, 2) NOT NULL
);
create table group_bets (
   roundid INT NOT NULL AUTO_INCREMENT,
   team1 VARCHAR(25) NOT NULL,
   team2 VARCHAR(25) NOT NULL,
   bet_value FLOAT(10, 2) NOT NULL,
   bet_time DATETIME NOT NULL,
   team1_total FLOAT(10, 2) NOT NULL,
   team2_total FLOAT(10, 2) NOT NULL,
);

/* When bet is made it will be added to group_bets with the bet_time stored. The totals for each team will then be updated and a new ration created. The frontend
can create the graph by simply pulling the ratio for each team respectively and the bet_time, with the bet_time on the x-axis and the ratio on the y. In terms of
optimum computation time the optimum would be to calculate the totals in the backend (so each calculating is just one extra addition rather than summing every bet
in the front-end), and calculating the ratios in the frontend*/
