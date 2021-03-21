// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract Bet {
    struct Player {
        address _address; 
        uint256 amount;
        uint32 team;
        bool exists;
    }

    struct Game {
        uint256 total1;
        uint256 total2;
    }

    mapping(address => Player) public team1;
    address[] public team1Keys;
    mapping(address => Player) public team2;

    address[] public team2Keys;

    Game public game;
    Player public leader;

    constructor(uint256 _amount, uint32 _team) {
        leader = Player({
            _address: msg.sender,
            amount: _amount,
            team: _team,
            exists: true
        });

        game = Game({
            total1: 0,
            total2: 0
        });

        if (leader.team == 1) {
            game.total1 += leader.amount;
            team1[leader._address] = leader;
            team1Keys.push(leader._address);
        } else {
            game.total2 += leader.amount;
            team2[leader._address] = leader;
            team2Keys.push(leader._address);
        }
    }

    function payout(uint32 winner) public payable{ 
        uint256 amount;
        if (winner == 1) {
            uint256 ratio1 = game.total2 / game.total1;
            for (uint32 i = 0; i < team1Keys.length; i++) {
                Player memory curr = team1[team1Keys[i]];
                amount = curr.amount + curr.amount * ratio1;
                payable(team1Keys[i]).transfer(amount);
            }
        }
        else if (winner == 2) {
            uint256 ratio2 = game.total1 / game.total2;
            for (uint32 i = 0; i < team2Keys.length; i++) {
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
    
    function playerExists(address _address) internal view returns(bool) {
        return team1[_address].exists || team2[_address].exists;
    }
    
    function joinGame(uint32 team) public payable {
        require(!playerExists(msg.sender));
        require(msg.value > 0);
        
        Player memory bettor = Player({
            _address: msg.sender,
            amount: msg.value,
            team: team,
            exists: true});
        
        if (team == 1) {
            game.total1 += msg.value;
            team1[bettor._address] = bettor;
            team1Keys.push(bettor._address);
        } else {
            game.total2 += msg.value;
            team2[bettor._address] = bettor;
            team2Keys.push(bettor._address);
        }
    }
}