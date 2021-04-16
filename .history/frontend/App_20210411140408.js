import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import AppNavigator from "./src/navigation/Navigation"
import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Tabbar from "./src/Tabbar"
import "./App.css"
import Web3Data from './Web3data.js';

import { useWeb3 } from '@openzeppelin/network/react';


import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/lib/react';
const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // const web3Context = useWeb3Injected(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
  // const { networkId, networkName, providerName } = web3Context;

  const web3Context = useWeb3(`wss://mainnet.infura.io/ws/v3/${PROJECT_ID}`);
  const { lib: web3, networkId, accounts, providerName } = web3Context;

  // Methods for requesting accounts access
  const requestAuth = (web3Context) => web3Context.requestAuth();
  const requestAccess = useCallback(() => requestAuth(web3Context), []);

  // Querying account balance
  const [balance, setBalance] = useState(0);
  const getBalance = useCallback(async () => {
    setBalance(
      accounts && accounts.length > 0
      ? (await web3.eth.getBalance(accounts[0]))
      : 'Unknown')
  }, [accounts, web3.eth, web3.utils]);
  useEffect(() => {
    getBalance();
  }, [accounts, getBalance, networkId]);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
    <div className="App">
      <div className="AppContent">
        <div className="title">Sports Betting</div>
                <div>Network: {networkId || 'No connection'}</div>
      <div>Your address: {accounts ? accounts[0] : 'Unknown'}</div>

      {accounts && accounts.length ? (
        <div>Accounts access granted</div>
      ) : !!networkId && providerName !== 'infura' ? (
        <button onClick={requestAccess}>Request Access</button>
      ) : (
        <div>No accounts access</div>
      )}
        <div className="tabbar">
          <Tabbar />
        </div>
    </div>
    

  );
}