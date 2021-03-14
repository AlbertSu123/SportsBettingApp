import React, {Component} from 'react'
import { Text, View } from 'react-native'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
    }

    logout() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });

    }


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

export default HomeScreen