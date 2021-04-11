const { expect } = require("chai");
const assert = require('assert');

let Betting;
let contract;

beforeEach(async function () {
    Betting = await ethers.getContractFactory("ExampleOracleContract"); //Bet is name of Contract
    contract = await Betting.deploy(); //Runs constructor of contract
});

describe("Oracle Testing", function() {
    it("Oracle Successfully Queried from URL and Imported Data", async function() {
        expect(await contract.ResultValue()).to.equal(2152.21);
    }); 
});