import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'

import Web3Data from './Web3data.js';


import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/lib/react';
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
    

        </View>
    )
    
}

export default HomeScreen