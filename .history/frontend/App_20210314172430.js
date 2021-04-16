import 'react-native-gesture-handler';

import React, { Component, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { NativeRouter, Route, Link } from "react-router-native";
import Routes from "./src/routes/RoutesConfig"


import {decode, encode} from 'base-64'
import { firebase } from './src/firebase/config'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

class App extends Component {


  render() {
  return (
    <NativeRouter>
          {Routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            ))}
    </NativeRouter>
  );
}
}