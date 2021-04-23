import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'
import Web3Data from './Web3data.js';
import "./Home.css"
import Web3 from 'web3';
import styles from "./styles"




class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
        account: '',
        taskCount: 0,
        tasks: []
        }
        const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';
    }

    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider)
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
    }

    componentWillMount() {
        this.loadBlockchainData()
    }
    
    render() {
    
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Text>{this.state.account}</Text>

            </View>
        )
        
    }
}

export default HomeScreen