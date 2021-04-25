import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'



import Web3Data from './Web3data.js';
import "./Home.css"

import Web3 from 'web3';
// import { betAbi } from './abi/abis';
const web3 = new Web3(Web3.givenProvider);
const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';

{/* <TouchableOpacity

onPress={() => logout()}>
<Text>Log Out</Text>
</TouchableOpacity> */}


// function logout() {
//     firebase.auth().signOut().then(() => {
//         // Sign-out successful.
//         }).catch((error) => {
//         // An error happened.
//         }).then(window.location.reload())

// }

// function SendPayment() {
//     const obj = {
//         from: Web3.eth.account
//     }
//     web3.eth.sendTransaction()
// }

promisify = (fun, params=[]) => {
  return new Promise((resolve, reject) => {
    fun(...params, (err, data) => {
      if (err !== null) reject(err);
      else resolve(data);
    });
  });
}

getCurrentAccount = async () => {
  const promise = promisify(web3.eth.getAccounts);
  const accounts = await promise;
  return accounts[0];
}

function HomeScreen() {

    const contractAddr = '0x97EaC1d4C5eA22dE6ba7292FA5d01a591Aac83A7';
    const x = getCurrentAccount()
    
    return (
        <View>
            {`${x}`}
            
            {/* <Text>Home Screen</Text>
    
            <div>
                Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
            </div>
        <Web3Data title="Web3 Data" web3Context={web3Context} />
        
        <button className="sendTransactionButton" onClick={SendPayment}>Send Transaction</button> */}

        </View>
    )
    
}

export default HomeScreen