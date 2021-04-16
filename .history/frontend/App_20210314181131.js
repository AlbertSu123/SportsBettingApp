import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import AppNavigator from "./src/navigation/Navigation"
import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';


const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // if (loading) {	
  //   return (	
  //     <></>	
  //   )	
  // }

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

    <NavigationContainer>
      <Stack.Navigator>

        { user ? (
              <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
          AppNavigator.map((route) => {
              <Stack.Screen name={route.name} component={route.screen} />
            })
          )
        }
        {console.log(AppNavigator)}
      </Stack.Navigator>
    </NavigationContainer>

    // 
    //   <Stack.Navigator>
    //     { user ? (
    //       <Stack.Screen name="Home">
    //         {props => <HomeScreen {...props} extraData={user} />}
    //       </Stack.Screen>
    //     ) : (
    //       <>
    //         
    //         <Stack.Screen name="Registration" component={RegistrationScreen} />
    //         <Stack.Screen name="Metamask" component={Account} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}