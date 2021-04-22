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
    [owner01, player01, player02] = await ethers.getSigners(); 
    Bettingcopy = await ethers.getContractFactory("Bet");
    contractcopy = await Betting.deploy(100000000000000, 2); 
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
    const initTotal1 = await contract.AmountOne();
    const initTotal2 = await contract.AmountTwo();
  });
  it("Correct total is incremented and player joins the game", async function() {
    await contract.connect(player1).joinGame(player1.team);
    assert(await contract.playerExists(player1.address))
    expect(await contract.AmountOne()).to.be.gt(initTotal1);
    expect(player1.team[player1.address].team.to.equal(player1.team); 
  });
  it("Correct total is incremented and player joins the game", async function() {
    await contract.connect(player2).joinGame(player2.team);
    assert(await contract.playerExists(player2.address));
    expect(await contract.AmountTwo()).to.be.gt(initTotal2);
    expect(player1.team[player1.address].team.to.equal(player1.team);
  });
}); 

describe("payout", function() {
  it("Contract leader address exists and leader object exists", async function() {
    assert.ok(owner.address);
    assert(await contract.playerExists(owner.address));
  });
  it("Correct total is incremented and player joins the game", async function() {
    await contract.payout(player1.team);
    expect(await contract.AmountOne()).to.equal(1);
  });
  it("Correct total is incremented and player joins the game", async function() {
    expect(await contractcopy.AmountTwo()).to.equal(1);
  });
});





