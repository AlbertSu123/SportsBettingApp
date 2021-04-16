
import HomeScreen from "../screens/HomeScreen/HomeScreen"
import LoginScreen from "../screens/LoginScreen/LoginScreen"
import RegistrationScreen from "../screens/RegistrationScreen/RegistrationScreen"
import Account from "../screens/Account/Account"


const AppNavigator = [
  {
    name: "Home",
    screen: HomeScreen
  },
  {
    name: "Login",
    screen: LoginScreen
  },
  {
    name:"Registration", 
    screen: RegistrationScreen
  },
  {
    name: "Account", 
    screen: Account
  },
]


export default AppContainer