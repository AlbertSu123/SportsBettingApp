import React, {Component} from 'react'
import { Text, View, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../../firebase/config'
const Web3 = require("web3");



class Metamask extends Component {
    constructor(props) {
        super(props)
    }

}


    
    const ethEnabled = () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        return true;
    }
    return false;
    }


    render() {
        return (
            <View>
                
            </View>
        )
    }
}

export default Metamask