import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import AppNavigator from "./src/navigation/Navigation"
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import Tabbar from "./src/Tabbar"
import "./App.css"
import Web3Data from './Web3data.js';


import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/lib/react';
const infuraProjectId = 'dc680c95a7eb4f79b01b29cad11003e1';

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const web3Context = useWeb3Injected(`wss://mainnet.infura.io/ws/v3/${infuraProjectId}`);
  const { networkId, networkName, providerName } = web3Context;

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

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

  return (
    <div className="App">
      <div className="AppContent">
        <div className="title">Sports Betting</div>
          <div>
            Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
          </div>
          <Web3Data title="Web3 Data" web3Context={web3Context} />
        </div>
        <div className="tabbar">
          <Tabbar />
        </div>
    </div>
    

  );
}