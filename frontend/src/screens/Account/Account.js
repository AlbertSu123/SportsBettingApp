import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity, Button} from 'react-native'
import { firebase } from '../../firebase/config'
const Web3 = require("web3");



const ethEnabled = () => {
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
    return true;
}
return false;
}

class Account extends Component {
    constructor(props) {
        super(props)
        ethEnabled()
    }

    render() {
        return (
            <View>
                <Button></Button>
                
            </View>
        )
    }
}

export default Account