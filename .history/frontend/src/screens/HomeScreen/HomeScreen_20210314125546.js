import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
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
        
                        onPress={() => logout()}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen