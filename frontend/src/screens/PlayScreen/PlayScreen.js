import React, {Component, useState} from 'react'
import { Text, View, TextInput, TouchableOpacity, Button, Form} from 'react-native'
import { firebase } from '../../firebase/config'
import Web3 from 'web3';
import styles from "./styles"
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';




class PlayScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
        account: '',
        taskCount: 0,
        tasks: [],
        amount: 0
        }

        const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';
        this.logOut = this.logOut.bind(this)
    }
    

    /* If this is not working for demo, comment the loadBlockchainData() and componentWillMount() function out */
    /*
    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider)
        const accounts = await web3.eth.getAccounts()
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({ account: accounts[0], balance: web3.utils.fromWei(balance, 'ether')})
    } 

    
    componentWillMount() {
        this.loadBlockchainData()
    } */

    logOut() {
        firebase.auth().signOut().then(() => {
            console.log("success")
        }).catch((error) => {
        console.log("error")
        });
    }
  
    
    handleTextChange (text) {
        //console.log(text)
        if (!isNaN(text) && !isNaN(parseFloat(text))) {
            this.setState({amount: text.concat(" Ether")})
        } else {
            this.setState({amount: "Input a valid numerical bet amount!"})
        }
     }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.makeBetTitle}>Make a Bet!</Text>
                <View style={styles.InfoContainer}>
                    <Text style={styles.AccountInfo}>{`Account #: ${this.state.account}`}</Text>
                    <Text style={styles.AccountInfo}>{`Account Balance: ${this.state.balance} Ether`}</Text>
                    <Text style={styles.AccountInfo}>{`Bet Amount: ${this.state.amount}`}</Text>

                    <Text style={styles.AccountInfo}>{`Enter Bet Amount: `} 
                    <TextInput
                    style={styles.input}
                    placeholder='Bet Amount'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => this.handleTextChange(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    />
                    </Text>
                </View>
            </View> 
        )
    }
}

export default PlayScreen