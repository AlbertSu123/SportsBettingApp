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
   team1_total FLOAT(10, 2) NOT NULL,
   team2_total FLOAT(10, 2) NOT NULL,
);
