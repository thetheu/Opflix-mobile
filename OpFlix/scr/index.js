import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from './pages/signin';
import ProfileScreen from './pages/profile';

const AuthStack = createStackNavigator({
    Sign: { screen: SignInScreen},
})


const MainNavigator = createStackNavigator({
    ProfileScreen: {
        screen: ProfileScreen,
    },
    Sign: { 
        screen: SignInScreen
    },{
        initialRouteName
    }
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
