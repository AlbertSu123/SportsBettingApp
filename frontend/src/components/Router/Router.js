
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/HomeScreen/HomeScreen'
import PlayScreen from '../../screens/PlayScreen/PlayScreen'

import Icon from '../Tabbar/Icon';
import TabBar from '../Tabbar/Tabbar';

const Tab = createBottomTabNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({tintColor}) => {
            return <Icon name={route} color={tintColor} />;
          },
        })}
        tabBar={(props) => <TabBar {...props} />}
        tabBarOptions={{
          activeTintColor: '#1E5FDC',
          inactiveTintColor: '#C5C5C5',
          showLabel: false,
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Planning" component={HomeScreen} />
        <Tab.Screen name="Play" component={PlayScreen} />
        <Tab.Screen name="Search" component={HomeScreen} />
        <Tab.Screen name="User" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}