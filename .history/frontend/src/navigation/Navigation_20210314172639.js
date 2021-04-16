import Account from "../screens/Account/Account.js"
import HomeScreen from "../screens/HomeScreen/HomeScreen"


const Routes = [
  {
    path: "/account",
    component: Account,
  },
  {
    path: "/home",
    component: HomeScreen,
  },
  {
    path: "/",
    component: Interiors,
  },
  {
    path: "/",
    component: Landing,
  },



];

export default Routes;