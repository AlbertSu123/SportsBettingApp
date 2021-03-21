// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract Bet {
    struct Player {
        address _address; 
        uint16 amount;
        uint8 team;
    }

    struct Game {
        uint16 total1;
        uint16 total2;
    }

    mapping(address => Player) public team1;
    address[] public team1Keys;
    mapping(address => Player) public team2;
    address[] public team2Keys;

    Game public game;

    constructor(uint16 amount, uint8 team) {
        Player memory leader = Player({
            _address: msg.sender,
            amount: amount,
            team: team
        });

        game = Game({
            total1: 0,
            total2: 0
        });

        if (leader.team == 1) {
            game.total1 += amount;
            leader = team1[leader._address];
            team1Keys.push(leader._address);
        } else {
            game.total2 += amount;
            leader = team2[leader._address];
            team2Keys.push(leader._address);
        }
    }


    function payout(uint8 winner) public payable{ 
        uint16 amount;
        if (winner == 1) {
            uint16 ratio1 = game.total2 / game.total1;
            for (uint8 i = 0; i < team1Keys.length; i++) {
                Player memory curr = team1[team1Keys[i]];
                amount = curr.amount + curr.amount * ratio1;
                payable(team1Keys[i]).transfer(amount);
            }
        }
        else if (winner == 2) {
            uint16 ratio2 = game.total1 / game.total2;
            for (uint8 i = 0; i < team2Keys.length; i++) {
                Player memory curr = team2[team2Keys[i]];
                amount = curr.amount + curr.amount * ratio2;
                payable(team2Keys[i]).transfer(amount);
            }
        }
        else {
            for (uint8 i = 0; i < team1Keys.length; i++) {
                Player memory curr = team1[team1Keys[i]];
                payable(team1Keys[i]).transfer(curr.amount);
            }
            for (uint8 i = 0; i < team2Keys.length; i++) {
                Player memory curr = team2[team2Keys[i]];
                payable(team2Keys[i]).transfer(curr.amount);
            }
        }
    }
}