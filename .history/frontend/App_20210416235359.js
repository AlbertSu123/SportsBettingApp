import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import AppNavigator from "./src/navigation/Navigation"
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { firebase } from './src/firebase/config'
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen/RegistrationScreen';
import Tabbar from "./src/Tabbar"
import "./App.css"


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const Stack = createStackNavigator();


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


  console.log(user)
  return (
    <div className="App">

      {/* <HomeScreen /> */}
      <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <Stack.Screen name="Home">
              {"ehllo"}
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Screen>
          ) : (
            <>
            {"ehllo"}
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>


      <div className="tabbar">
        <Tabbar />
      </div>
    </div>
    

  );
}