import React, { Component } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import TabBar from 'react-native-nav-tabbar';
import { BiHomeAlt } from "react-icons/ai";


export default class Tabbar extends Component {
    render() {
        return(
            <TabBar>
                <TabBar.Item
                    icon={<BiHomeAlt color="black"/>}
                    title="Home"
                >
                    <View>
                        <Text style={{fontSize: 18}}>Home</Text>
                    </View>
                </TabBar.Item>
                <TabBar.Item>
                    <View>
                        <Text style={{fontSize: 18}}>Friends</Text>
                    </View>
                </TabBar.Item>
                <TabBar.Item
                    // icon={require('./images/My.png')}
                    // selectedIcon={require('./images/MyActive.png')}
                    title="Me"
                >
                    <View>
                        <Text style={{fontSize: 18}}>Me</Text>
                    </View>
            </TabBar.Item>
        </TabBar>

        )
    }
}

