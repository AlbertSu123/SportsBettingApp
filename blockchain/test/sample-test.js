// https://hardhat.org/tutorial/testing-contracts.html
const { expect } = require("chai");
const assert = require('assert');


let owner, player1, player2, owner01, player01, player02;
let Betting, Bettingcopy;
let contract, contractcopy;

//Runs before each test (deploys a new contract each time)
beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners(); //Gets list of players you can test with
    Betting = await ethers.getContractFactory("Bet"); //Bet is name of Contract
    contract = await Betting.deploy(100000000000000, 1); //Runs constructor of contract
  });

beforeEach(async function () {
    [owner0, player01, player02, player03, player04] = await ethers.getSigners(); 
    Betting1 = await ethers.getContractFactory("Bet");
    contract1 = await Betting.deploy(100000000000000, 2); 
  });

beforeEach(async function () {
    [owner01, player10] = await ethers.getSigners(); 
    Betting2 = await ethers.getContractFactory("Bet");
    contract2 = await Betting.deploy(100000000000000, 2); 
  });

describe("Constructor", function() {
  it("Contract leader address exists and leader object exists", async function() {
    assert.ok(owner.address);
    assert(await contract.playerExists(owner.address));
  });
  it("Team 1 should have some ether and team 2 should have none", async function() {
    expect(await contract.AmountOne()).to.equal(100000000000000);
    expect(await contract.AmountTwo()).to.equal(0);
  });
}); 

describe("joinGame", function() {
  it("Contract leader address exists and leader object exists", async function() {
    assert.ok(owner.address);
    assert(await contract.playerExists(owner.address));
  });
  it("2 players: Total1 is incremented and player1 joins the game", async function() {
    const initTotal1 = await contract.AmountOne();
    await contract.connect(player1).joinGame(player1.team);
    assert(await contract.playerExists(player1.address))
    //expect(await contract.AmountOne()).to.be.gt(initTotal1);
    expect(await contract.AmountOne()).to.equal(initTotal1 + player1.getBalance());
    expect(player1.team[player1.address].team.to.equal(player1.team); 
  });
  it("2 players: Total2 is incremented and player2 joins the game", async function() {
    const initTotal2 = await contract.AmountTwo();
    await contract.connect(player2).joinGame(player2.team);
    assert(await contract.playerExists(player2.address));
    //expect(await contract.AmountTwo()).to.be.gt(initTotal2);
    expect(await contract.AmountTwo()).to.equal(initTotal2 + player2.getBalance());
    expect(player1.team[player1.address].team.to.equal(player1.team));
  });
  it("4 players: Total1 is incremented, player01 and joins the game", async function() {
    const initTotal2 = await contract.AmountTwo();
    await contract.connect(player2).joinGame(player2.team);
    assert(await contract.playerExists(player2.address));
    //expect(await contract.AmountTwo()).to.be.gt(initTotal2);
    expect(await contract.AmountTwo()).to.equal(initTotal2 + player2.getBalance());
    expect(player1.team[player1.address].team.to.equal(player1.team));
  });

}); 

describe("payout", function() {
  it("Contract leader address exists and leader object exists", async function() {
    assert.ok(owner.address);
    assert(await contract.playerExists(owner.address));
    const initBalance1 = await player1.getBalance();
    const initBalance2 = await player2.getBalance();
  });
  it("Team 1 wins and correct and end values are reached", async function() {
    await contract.connect(player1).joinGame(player1.team);
    await contract.connect(player2).joinGame(player2.team);
    await contract.payout(1);

    const finalBalance1 = initBalance1 + ((await contract.AmountTwo()) / (await contract.AmountOne()));

    expect(await player1.getBalance().to.equal(finalBalance1));
    expect(await player2.getBalance().to.equal(0)); 
  });
  it("Team 2 wins and correct and end values are reached", async function() {
    await contract.connect(player1).joinGame(player1.team);
    await contract.connect(player2).joinGame(player2.team);
    await contract.payout(2);

    const finalBalance2 = initBalance2 + ((await contract.AmountOne()) / (await contract.AmountTwo()));

    expect(await player1.getBalance().to.equal(0));
    expect(await player2.getBalance().to.equal(finalBalance2));
  });
  it("Correct total is incremented and player joins the game", async function() {
    expect(await contractcopy.AmountTwo()).to.equal(1);
  });
});





