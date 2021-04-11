//SPDX-License-Identifier: GPL-3.0
pragma solidity >0.5.0;
import "https://github.com/provable-things/ethereum-api/blob/master/provableAPI_0.5.sol";

contract ExampleOracleContract is usingProvable {
    string public ETHUSD;
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewProvableQuery(string description);
    
    function ExampleContract() payable {
        LogConstructorInitiated("Constructor was initiated. Call 'updatePrice()' to send the Provable Query.");
    }

    function ResultValue() public view returns (string) {
        return ETHUSD;
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != provable_cbAddress()) revert();
        ETHUSD = result;
        LogPriceUpdated(result);
    }

    function updatePrice() payable {
        if (provable_getPrice("URL") > this.balance) {
            LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            LogNewProvableQuery("Provable query was sent, standing by for the answer..");
            provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
            }
    }
}