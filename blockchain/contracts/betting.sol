//SPDX-License-Identifier: GPL-3.0
pragma solidity > 0.5.15 < 0.7.0;

contract Bet {
    uint256 public minimumBet;
    uint256 public total1;
    uint256 public total2;
    address payable public leader_addy;

    mapping(address => Player) public team1;
    address payable[] public addy1;
    mapping(address => Player) public team2;
    address payable[] public addy2;

    struct Player {
        uint256 amount;
        uint32 team;
    }

    constructor() public {
        total1 = 0;
        total2 = 0;
        minimumBet = 0; //Figure out actual minimum bet
        leader_addy = address(uint160(msg.sender));
    }
    
     function kill() public onlyBy(leader_addy) {
       require(address(this).balance <= 0, "Cannot destroy a contract with ether left behind.");        
       selfdestruct(leader_addy); //Leader gets all remaining ether so I am ensuring none is left behind.
    }

    function playerExists(address _addy) public view returns (bool) {
        for (uint32 i = 0; i < addy1.length; i++) {
            if (addy1[i] == _addy) {
                return true;
            }
        }
        for (uint32 i = 0; i < addy2.length; i++) {
            if (addy2[i] == _addy) {
                return true;
            }
        }
        return false;
    }
    
    modifier onlyBy(address _account) {
        require(
            msg.sender == _account,
            "Sender not authorized."
        );
        _;
    }


    function joinGame(uint32 team) public payable {
        require(!playerExists(msg.sender));
        require(msg.value > minimumBet);

        Player memory bettor = Player({amount: msg.value, team: team});

        if (team == 1) {
            total1 += msg.value;
            team1[msg.sender] = bettor;
            addy1.push(address(uint160(msg.sender)));
        } else {
            total2 += msg.value;
            team2[msg.sender] = bettor;
            addy2.push(address(uint160(msg.sender)));
        }
    }

    function payout() public payable {
        uint32 _winner = 1;
        uint256 amount;
        uint32 tol = 10000;

        if (_winner == 1) {
            uint256 ratio1 = 0;
            if (total1 != 0){
                ratio1 = (tol * total2) / total1;
            }
            for (uint32 i = 0; i < addy1.length; i++) {
                amount = tol * team1[addy1[i]].amount + team1[addy1[i]].amount * ratio1;
                amount = amount/tol;
                addy1[i].transfer(amount);
            }
        } else if (_winner == 2) {
            uint256 ratio2 = 0;
            if (total2 != 0){
                ratio2 = (tol * total1) / total2;
            }
            for (uint32 i = 0; i < addy2.length; i++) {
                amount = tol * team2[addy2[i]].amount + team2[addy2[i]].amount * ratio2;
                amount = amount/tol;
                addy2[i].transfer(amount);
            }
        } else {
            for (uint32 i = 0; i < addy1.length; i++) {
                amount = team1[addy1[i]].amount;
                addy1[i].transfer(amount);
            }
            for (uint32 i = 0; i < addy2.length; i++) {
                amount = team2[addy2[i]].amount;
                addy2[i].transfer(amount);
            }
        }
        
        //Cleanup Process
        total1 = 0;
        total2 = 0;
        for (uint32 i = 0; i < addy1.length; i++) {
            delete team1[addy1[i]];
        }
        for (uint32 i = 0; i < addy2.length; i++) {
            delete team2[addy2[i]];
        }
        addy1.length = 0;
        addy2.length = 0;
    }
}