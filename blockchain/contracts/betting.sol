//SPDX-License-Identifier: GPL-3.0
// pragma solidity > 0.6.1 < 0.7.0;
pragma solidity > 0.5.15 < 0.7.0;


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

    constructor() public /* uint256 _amount, uint32 _team */
    {
        // leader = Player({
        //     amount: _amount,
        //     team: _team
        // });
        total1 = 0;
        total2 = 0;
        minimumBet = 2; //Figure out actual minimum bet
        leader_addy = address(uint160(msg.sender));

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

    function playerExists(address _addy) public view returns (bool) {
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

    function kill() public {
        if (msg.sender == leader_addy) selfdestruct(leader_addy);
    }

    function joinGame(uint32 team) public payable {
        // require(!playerExists(msg.sender));
        // require(msg.value > minimumBet);

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
        if (_winner == 1) {
            uint256 ratio1 = 0;
            if (ratio1 != 0){
                ratio1 =total2 / total1;
            }
            for (uint32 i = 0; i < addy1.length; i++) {
                amount = team1[addy1[i]].amount + team1[addy1[i]].amount * ratio1;
                addy1[i].transfer(amount);
            }
        } else if (_winner == 2) {
            uint256 ratio1 = 0;
            if (ratio1 != 0){
                ratio1 = total1 / total2;
            }
            for (uint32 i = 0; i < addy1.length; i++) {
                amount = team1[addy1[i]].amount + team1[addy1[i]].amount * ratio1;
                addy1[i].transfer(amount);
            }
        } else {
            for (uint8 i = 0; i < addy1.length; i++) {
                Player memory curr = team1[addy1[i]];
                addy1[i].transfer(curr.amount);
            }
            for (uint8 i = 0; i < addy2.length; i++) {
                Player memory curr = team2[addy2[i]];
                addy2[i].transfer(curr.amount);
            }
        }
    }
}
