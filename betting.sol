// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract Bet {
    struct Player {
        address _address; 
        uint amount;
        uint team;
        bool exists;
    }

    struct Game {
        uint total1;
        uint total2;
    }

    mapping(address => Player) public team1;
    mapping(address => Player) public team2;
    Game public game; //Public for testing purposes
    
    constructor(uint amount, uint team) {
        Player memory leader = Player({
            _address: msg.sender,
            amount: amount,
            team: team,
            exists: true
        });

        game = Game({
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
    
    function playerExists(address _address) internal view returns(bool) {
        return team1[_address].exists || team2[_address].exists;
    }
    
    function joinGame(uint team) public payable {
        require(!playerExists(msg.sender));
        require(msg.value > 0);
        
        Player memory bettor = Player({
            _address: msg.sender,
            amount: msg.value,
            team: team,
            exists: true});
        
        if (team == 1) {
            game.total1 += msg.value;
            team1[msg.sender] = bettor;
        } else {
            game.total2 += msg.value;
            team2[msg.sender] = bettor;
        }
    }
}