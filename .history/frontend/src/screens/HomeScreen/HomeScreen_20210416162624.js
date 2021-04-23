import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'


import { Connectors } from 'web3-react'
const { InjectedConnector, NetworkOnlyConnector } = Connectors
 
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] })
 const Infura = new NetworkOnlyConnector({
  providerURL: 'https://mainnet.infura.io/v3/...'
})
import Web3Data from './Web3data.js';
import "./Home.css"


import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/lib/react';



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

function SendPayment() {
    const obj = {
        from: web3.eth.account
    }
    web3.eth.sendTransaction()
}

function HomeScreen() {



    const web3Context = useWeb3Injected(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
    const { networkId, networkName, providerName } = web3Context;
    const contractAddr = '0x97EaC1d4C5eA22dE6ba7292FA5d01a591Aac83A7';

    console.log("sdasd")
    return (
        <View>
            <Text>Home Screen</Text>
    
            <div>
                Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
            </div>
        <Web3Data title="Web3 Data" web3Context={web3Context} />
        
        <button className="sendTransactionButton" onClick={SendPayment}>Send Transaction</button>

        </View>
    )
    
}

export default HomeScreen