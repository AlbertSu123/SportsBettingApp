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
        amount: 0,
        value: 'Team 1'
        }

        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handleTeamSubmit = this.handleTeamSubmit.bind(this);

        const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';
        this.logOut = this.logOut.bind(this)
    }

    handleTeamChange(event) {
        this.setState({value: event.target.value});
    }

    handleTeamSubmit(event) {
        alert('Your chosen team is: ' + this.state.value);
        event.preventDefault();
    }

    async loadBlockchainData() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            web3 = new Web3(window.ethereum);
            this.setState({ account: accounts[0] })
            const balance = await web3.eth.getBalance(accounts[0])
            this.setState({balance: web3.utils.fromWei(balance, 'ether')})
        }
    }
     
    componentWillMount() {
        this.loadBlockchainData()
    } 

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
                    <Text style={styles.AccountInfo}>{`Which team would you like to bet for?`}  </Text>
                    <form onSubmit={this.handleTeamSubmit}>
                        <select value={this.state.value} onChange={this.handleTeamChange}>
                            <option value="Team 1">Team 1</option>
                            <option value="Team 2">Team 2</option>
                        </select>
                        <input type="submit" value="Submit" />
                    </form>
                    <Text>{'\n'}</Text>
                    <Button
                        title="Payout"
                        color="#36c464"
                        onPress={() => alert('Payout Received!')}
                    />
                </View>
            </View> 
        )
    }
}

export default PlayScreen