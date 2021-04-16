import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react'
import AppContainer from "./src/navigation/Navigation"
import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'


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

    <AppContainer />
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     { user ? (
    //       <Stack.Screen name="Home">
    //         {props => <HomeScreen {...props} extraData={user} />}
    //       </Stack.Screen>
    //     ) : (
    //       <>
    //         <Stack.Screen name="Login" component={LoginScreen} />
    //         <Stack.Screen name="Registration" component={RegistrationScreen} />
    //         <Stack.Screen name="Metamask" component={Account} />
    //       </>
    //     )}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}