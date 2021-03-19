// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract Bet {
    struct Player {
        address _address; 
        uint amount;
        uint team;
    }

    struct Game {
        uint total1;
        uint total2;
    }

    mapping(address => Player) public team1;
    mapping(address => Player) public team2;
    
    constructor(uint amount, uint team) {
        Player memory leader = Player({
            _address: msg.sender,
            amount: amount,
            team: team
        });

        Game memory game = Game({
            total1: 0,
            total2: 0
        });

        if (leader.team == 1) {
            game.total1 += amount;
            leader = team1[leader._address];
        } else {
            game.total2 += amount;
            leader = team2[leader._address];
        }
    }
}