import React, {Component} from 'react'
import { Text, View } from 'react-native'

class HomeScreen extends Component {


    render() {
        return (
            <View>
                <Text>Home Screen</Text>
                    <TouchableOpacity
        
                        onPress={() => onLoginPress()}>
                        <Text style={styles.buttonTitle}>Log in</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}