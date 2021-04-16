import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'


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
            }).then(window.location.reload())

    }


    render() {
        return (
            <View>
                <Text>Home Screen</Text>
       
          <div>
            Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
          </div>
          <Web3Data title="Web3 Data" web3Context={web3Context} />
       
                
                    <TouchableOpacity
        
                        onPress={() => this.logout()}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen