// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.8.0;

contract Bet {
    struct Player {
        address _address; 
        uint amount;
        bytes32 teamName;
    }

    struct Team {
        bytes32 name;
        address[] bettors;
    }
    
    
    mapping(address => Player) public allBettors;


    constructor(uint amount, bytes32 teamName) {
        Player memory leader = Player({
            _address: msg.sender,
            amount: amount,
            teamName: teamName
        });
        
        allBettors[msg.sender] = leader;
        address[] memory teamBettors = new address[](1);
        
        Team memory team = Team({
            name: leader.teamName,
            bettors: teamBettors
            
        });
        
        team.bettors.push(leader._address);
    }
}