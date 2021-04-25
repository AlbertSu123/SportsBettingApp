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
  it("Contract leader exists, and can join the game", async function() {
    assert.ok(owner.address)

    let overrides = {
    // To convert Ether to Wei:
    value: ethers.utils.parseEther("10")     // ether in this case MUST be a string

    // Or you can use Wei directly if you have that:
    // value: someBigNumber
    // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
    // value: "1234567890"
    // value: "0x1234"

    // Or, promises are also supported:
    // value: provider.getBalance(addr)
  };

// Pass in the overrides as the 3rd parameter to your 2-parameter function:

    await contract.joinGame(1, overrides);
    
    assert(await contract.playerExists(owner.address))
  });
  it("Team 1 should have some ether and team 2 should have none", async function() {
    expect(await contract.AmountOne()).to.equal(0);
    expect(await contract.AmountTwo()).to.equal(0);
  });
}); 


