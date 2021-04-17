// https://hardhat.org/tutorial/testing-contracts.html
const { expect } = require("chai");
const assert = require('assert');


let owner, player1, player2;
let Betting;
let contract;

//Runs before each test (deploys a new contract each time)
beforeEach(async function () {
    [owner, player1, player2] = await ethers.getSigners(); //Gets list of players you can test with
    Betting = await ethers.getContractFactory("Bet"); //Bet is name of Contract
    contract = await Betting.deploy(); //Runs constructor of contract
  });

describe("Construtor", function() {
  it("Contract leader address exists and leader object exists", async function() {
    assert.ok(owner.address)
    await contract.joinGame()
    assert(await contract.playerExists(owner.address))
  });
  it("Team 1 should have some ether and team 2 should have none", async function() {
    expect(await contract.AmountOne()).to.equal(0);
    expect(await contract.AmountTwo()).to.equal(0);
  });
}); 


