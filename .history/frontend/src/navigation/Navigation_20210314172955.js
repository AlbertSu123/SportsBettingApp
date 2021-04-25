import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "../screens/HomeScreen/HomeScreen"
import LoginScreen from "../screens/LoginScreen/LoginScreen"
import RegistrationScreen from "../screens/RegistrationScreen"
import Account from "../screens/Account/Account"


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  About: {
    screen: AboutScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);


export default AppContainer