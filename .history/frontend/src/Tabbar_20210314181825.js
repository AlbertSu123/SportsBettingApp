import { Component } from 'react';
import TabBar from 'react-native-nav-tabbar';
import {Component} from "react-native"


export default class Tabbar extends Component {
    render() {
        return(
                <TabBar>
        <TabBar.Item
            icon={require('./images/Home.png')}
            selectedIcon={require('./images/HomeActive.png')}
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
            icon={require('./images/My.png')}
            selectedIcon={require('./images/MyActive.png')}
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


export default TabBar