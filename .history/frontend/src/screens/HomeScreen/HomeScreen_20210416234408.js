import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'



import Web3Data from './Web3data.js';
import "./Home.css"

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider);
const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';




class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
        account: '',
        taskCount: 0,
        tasks: []
        }
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:19006")
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }
    
    render() {
    return (
        <View>
            <Text>{this.state.account}</Text>
            
            {/* <Text>Home Screen</Text>
    
            <div>
                Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
            </div>
        <Web3Data title="Web3 Data" web3Context={web3Context} />
        
        <button className="sendTransactionButton" onClick={SendPayment}>Send Transaction</button> */}

        </View>
    )
    
}
}

export default HomeScreen