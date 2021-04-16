import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TabBar from 'react-native-nav-tabbar';


export default class Tabbar extends Component {
    render() {
        return(
            <TabBar>
                <TabBar.Item
                    // icon={require('./images/Home.png')}
                    // selectedIcon={require('./images/HomeActive.png')}
                    title="Home"
                >
                    <View style={styles.textContent}>
                        <Text style={{fontSize: 18}}>Home</Text>
                    </View>
                </TabBar.Item>
                <TabBar.Item>
                    <View style={styles.textContent}>
                        <Text style={{fontSize: 18}}>Friends</Text>
                    </View>
                </TabBar.Item>
                <TabBar.Item
                    // icon={require('./images/My.png')}
                    // selectedIcon={require('./images/MyActive.png')}
                    title="Me"
                >
                    <View style={styles.textContent}>
                        <Text style={{fontSize: 18}}>Me</Text>
                    </View>
            </TabBar.Item>
        </TabBar>

        )
    }
}

