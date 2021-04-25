import { createStackNavigator, createAppContainer } from "react-navigation-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen"
import LoginScreen from "../screens/LoginScreen/LoginScreen"
import RegistrationScreen from "../screens/RegistrationScreen/RegistrationScreen"
import Account from "../screens/Account/Account"


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Login: {
    screen: LoginScreen
  },
  Registration: {
    screen: RegistrationScreen
  },
  Account: {
    screen: Account
  }
});

const AppContainer = createAppContainer(AppNavigator);


export default AppContainer