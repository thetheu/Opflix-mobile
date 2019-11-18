import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from './pages/signin';
import ProfileScreen from './pages/profile';
import LancamentosScreen from './pages/lancamentos';

const AuthStack = createStackNavigator({
    Sign: { screen: SignInScreen},
})



const MainNavigator = createStackNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
    },
    LancamentosScreen: { 
        screen: LancamentosScreen
    },
});



export default createAppContainer(
    createSwitchNavigator(
        {
            MainNavigator,
            AuthStack,
        },
        {
            initialRouteName: 'AuthStack'
        },
    ),
)
