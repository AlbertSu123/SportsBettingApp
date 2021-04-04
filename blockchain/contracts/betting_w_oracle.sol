// // SPDX-License-Identifier: GPL-3.0

// pragma solidity >0.5.0;
// import "github.com/provable-things/ethereum-api/provableAPI_0.5.sol";


// contract Bet is usingProvable {
//     struct Player {
//         address _address; 
//         uint256 amount;
//         uint32 team;
//         bool exists;
//     }

//     struct Game {
//         uint256 total1;
//         uint256 total2;
//     }

//     mapping(address => Player) public team1;
//     address[] public team1Keys;
//     mapping(address => Player) public team2;

//     address[] public team2Keys;

//     Game public game;
//     Player public leader;
//     string public winner;
//     string team1String; 
//     string team2String;
//     string gameID;
    
//     event LogNewProvableQuery(string description);
//     event LogResult(string result);
    

//     constructor(uint256 _amount, uint32 _team, string memory _gameID) public {
//         leader = Player({
//             _address: msg.sender,
//             amount: _amount,
//             team: _team,
//             exists: true
//         });

//         game = Game({
//             total1: 0,
//             total2: 0
//         });

//         if (leader.team == 1) {
//             game.total1 += leader.amount;
//             team1[leader._address] = leader;
//             team1Keys.push(leader._address);
//         } else {
//             game.total2 += leader.amount;
//             team2[leader._address] = leader;
//             team2Keys.push(leader._address);
//         }
        
       
//         gameID = _gameID;
//     }
    
//     function __callback(
//         bytes32 _myid,
//         string memory _result
//     )
//         public
//     {
//         require(msg.sender == provable_cbAddress());
//         emit LogResult(_result);
//         winner = _result;
//     }

//      function request(
//         string memory _query,
//         string memory _method,
//         string memory _url,
//         string memory _kwargs
//     )
//         public
//         payable
//     {
//         if (provable_getPrice("computation") > address(this).balance) {
//             emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
//         } else {
//             emit LogNewProvableQuery("Provable query was sent, standing by for the answer...");
//             provable_query("computation",
//                 [_query,
//                 _method,
//                 _url,
//                 _kwargs]
//             );
//         }
//     }
    
//     function requestCustomHeaders()
//         public
//         payable
//     {
//         request("json(QmdKK319Veha83h6AYgQqhx9YRsJ9MJE7y33oCXyZ4MqHE)",
//                 "GET",
//                 "https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=basketball",
//                 "{'headers': {'x-rapidapi-key': '78ea5e7bfdmshae8e2447cc43203p1d9630jsn00e54f133806', 'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com'}}");
//     }


//     function payout(uint32 winner) public payable{ 
//         uint256 amount;
//         if (winner == 1) {
//             uint256 ratio1 = game.total2 / game.total1;
//             for (uint32 i = 0; i < team1Keys.length; i++) {
//                 Player memory curr = team1[team1Keys[i]];
//                 amount = curr.amount + curr.amount * ratio1;
//                 address(uint160(team1Keys[i])).transfer(amount);
//             }
//         }
//         else if (winner == 2) {
//             uint256 ratio2 = game.total1 / game.total2;
//             for (uint32 i = 0; i < team2Keys.length; i++) {
//                 Player memory curr = team2[team2Keys[i]];
//                 amount = curr.amount + curr.amount * ratio2;
//                 address(uint160(team2Keys[i])).transfer(amount);
//             }
//         }
//         else {
//             for (uint8 i = 0; i < team1Keys.length; i++) {
//                 Player memory curr = team1[team1Keys[i]];
//                 address(uint160(team1Keys[i])).transfer(curr.amount);
//             }
//             for (uint8 i = 0; i < team2Keys.length; i++) {
//                 Player memory curr = team2[team2Keys[i]];
//                 address(uint160(team2Keys[i])).transfer(curr.amount);
//             }
//         }
//     }
    
//     function playerExists(address _address) internal view returns(bool) {
//         return team1[_address].exists || team2[_address].exists;
//     }
    
//     function joinGame(uint32 team) public payable {
//         require(!playerExists(msg.sender));
//         require(msg.value > 0);
        
//         Player memory bettor = Player({
//             _address: msg.sender,
//             amount: msg.value,
//             team: team,
//             exists: true});
        
//         if (team == 1) {
//             game.total1 += msg.value;
//             team1[bettor._address] = bettor;
//             team1Keys.push(bettor._address);
//         } else {
//             game.total2 += msg.value;
//             team2[bettor._address] = bettor;
//             team2Keys.push(bettor._address);
//         }
//     }
// }