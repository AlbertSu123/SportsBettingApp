const { expect } = require("chai");
const assert = require('assert');

let owner;
let Betting;
let contract;
beforeEach(async function () {
    [owner] = await ethers.getSigners(); 
    Betting = await ethers.getContractFactory("Bet"); //Name of Contract
    contract = await Betting.deploy(100000000000000, 1); //Runs constructor of contract
  });

describe("Construtor", function() {
  it("Contract leader is set properly ", async function() {
    // const ownerBalance = await contract.balanceOf(owner.address);
    assert.ok(owner.address)
    expect(await contract.AmountOne()).to.equal(100000000000000);
    expect(await contract.AmountTwo()).to.equal(0);
    assert(await contract.playerExists(owner.address))
  });
}); 

