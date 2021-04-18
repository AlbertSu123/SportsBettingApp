import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'

import Web3Data from './Web3data.js';


import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/lib/react';
const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';



function HomeScreen() {


    function logout() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            }).then(window.location.reload())

    }
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }
    function submitRequest() {

    }

    function handleBetSubmit(event) {
        event.preventDefault();
    }

    const web3Context = useWeb3Injected(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
    const { networkId, networkName, providerName } = web3Context;

    console.log("sdasd")
    return (
        <div className="PlaceBet">
        <Form onSubmit={handleBetSubmit}>
            <Form.Group size="lg" controlId="money">
            <Form.Label>How much Money to Bet</Form.Label>
            <Form.Control
                autoFocus
                type="money"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
            />
            </Form.Group>
            <Form.Group size="lg" controlId="team">
            <Form.Label>Password</Form.Label>
            <Form.Control
                type="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
            />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
            Place Bet
            </Button>
        </Form>
        </div>
    )
    
}

export default HomeScreen