//SPDX-License-Identifier: GPL-3.0
pragma solidity >0.5.0;

/* TODO: 
1. Figure out actual minimum bet
2. Get rid of total updates as that will happen on database
3. Add change owner function
4. Owner shouldn't participate in bet
*/ 

contract Bet { 
    uint256 public minimumBet;
    uint256 public total1;
    uint256 public total2;
    Player public leader;
    address payable public leader_addy;
    
    mapping(address => Player) public team1;
    address payable[] public addy1;
    mapping(address => Player) public team2;
    address payable[] public addy2;
  
    struct Player {
        uint256 amount;
        uint32 team;
    }

    constructor(uint256 _amount, uint32 _team) public {
        // leader = Player({
        //     amount: _amount,
        //     team: _team
        // });

        total1 = 0;
        total2 = 0;
        minimumBet = 100000000000000; 
        leader_addy = msg.sender;

        // if (leader.team == 1) {
        //     total1 += leader.amount;
        //     team1[leader_addy] = leader;
        //     addy1.push(leader_addy);
        // } else {
        //     total2 += leader.amount;
        //     team2[leader_addy] = leader;
        //     addy2.push(leader_addy);
        // }
    }

    function AmountOne() public view returns (uint256) {
        return total1;
    }

    function AmountTwo() public view returns (uint256) {
        return total2;
    }

    function playerExists(address _addy) public view returns(bool) {
        for (uint8 i = 0; i < addy1.length; i++) {
            if (addy1[i] == _addy) {
                return true;
            }
        }
        for (uint8 i = 0; i < addy2.length; i++) {
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

    function kill() public onlyBy(leader_addy) {
       require(address(this).balance <= 0, "Cannot destroy a contract with ether left behind.");        
       selfdestruct(leader_addy); //Leader gets all remaining ether so I am ensuring none is left behind.
    }

    function joinGame(uint32 team) public payable {
        require(!playerExists(msg.sender));
        require(msg.value > minimumBet);
        
        Player memory bettor = Player({
            amount: msg.value,
            team: team});
        
        if (team == 1) {
            total1 += msg.value;
            team1[msg.sender] = bettor;
            addy1.push(msg.sender);
        } else {
            total2 += msg.value;
            team2[msg.sender] = bettor;
            addy2.push(msg.sender);
        }
    }

    
    function payout(uint32 _winner) public payable onlyBy(leader_addy) { 
        uint256 amount;
        uint32 tol = 10000;
        if (_winner == 1) {
            uint256 ratio1 = (tol * total2) / total1;
            for (uint8 i = 0; i < addy1.length; i++) {
                Player memory curr = team1[addy1[i]];
                amount = (tol * curr.amount +  curr.amount * ratio1) / tol;
               addy1[i].transfer(amount);
            }
        }
        else if (_winner == 2) {
            uint256 ratio2 = (tol * total1) / total2;
            for (uint8 i = 0; i < addy2.length; i++) {
                Player memory curr = team2[addy2[i]];
                amount = (tol * curr.amount +  curr.amount * ratio2) / tol;
                addy2[i].transfer(amount);
            }
        }
        else {
            for (uint8 i = 0; i < addy1.length; i++) {
                Player memory curr = team1[addy1[i]];
                addy1[i].transfer(curr.amount);
            }
            for (uint8 i = 0; i < addy2.length; i++) {
                Player memory curr = team2[addy2[i]];
                addy2[i].transfer(curr.amount);
            }
        }

        //Cleanup Process
        total1 = 0;
        total2 = 0;
        for (uint8 i = 0; i < addy1.length; i++) {
            delete team1[addy1[i]];
        }
        for (uint8 i = 0; i < addy2.length; i++) {
            delete team2[addy2[i]];
        }
        addy1.length = 0;
        addy2.length = 0;
    }
}
