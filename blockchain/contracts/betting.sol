// SPDX-License-Identifier: GPL-3.0

pragma solidity >= 0.5.0 < 0.6.0;
import "github.com/provable-things/ethereum-api/provableAPI_0.5.sol";


contract Bet is usingProvable {
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
    string public winner;
    string team1String; 
    string team2String;
    string gameID;
    
    event LogNewProvableQuery(string description);

    

    constructor(uint256 _amount, uint32 _team, string memory _gameID) public {
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
        
       
        gameID = _gameID;
    }
    
    function __callback(
        bytes32 _myid,
        string memory _result
    )
        public
    {
        require(msg.sender == provable_cbAddress());
        winner = _result;
    }

    function update()
        public
        payable
    {
        emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
        provable_query("URL", "json(https://api.the-odds-api.com/v3/odds/?sport=upcoming&region=us&mkt=h2h&dateFormat=iso&apiKey=ec498c1049f9355fd0a91d41fedd66c9).data[1]"); 
    }

    function payout(uint32 winner) public payable{ 
        uint256 amount;
        if (winner == 1) {
            uint256 ratio1 = game.total2 / game.total1;
            for (uint32 i = 0; i < team1Keys.length; i++) {
                Player memory curr = team1[team1Keys[i]];
                amount = curr.amount + curr.amount * ratio1;
                address(uint160(team1Keys[i])).transfer(amount);
            }
        }
        else if (winner == 2) {
            uint256 ratio2 = game.total1 / game.total2;
            for (uint32 i = 0; i < team2Keys.length; i++) {
                Player memory curr = team2[team2Keys[i]];
                amount = curr.amount + curr.amount * ratio2;
                address(uint160(team2Keys[i])).transfer(amount);
            }
        }
        else {
            for (uint8 i = 0; i < team1Keys.length; i++) {
                Player memory curr = team1[team1Keys[i]];
                address(uint160(team1Keys[i])).transfer(curr.amount);
            }
            for (uint8 i = 0; i < team2Keys.length; i++) {
                Player memory curr = team2[team2Keys[i]];
                address(uint160(team2Keys[i])).transfer(curr.amount);
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