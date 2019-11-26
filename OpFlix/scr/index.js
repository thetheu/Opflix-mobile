import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from './pages/signin';
import ProfileScreen from './pages/profile';
import LancamentosScreen from './pages/lancamentos';

const AuthStack = createStackNavigator({
    Sign: { screen: SignInScreen },
})

const MainNavigator = createBottomTabNavigator({

    LancamentosScreen: {
        screen: LancamentosScreen
    },
    ProfileScreen: {
        screen: ProfileScreen,
    }
},
    {
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            inactiveBackgroundColor: '#111',
            activeBackgroundColor: '#000',
            style: {
                width: '100%',
                height: 50,
            },
        },
    }
);



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
