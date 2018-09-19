import React from 'react';
import { createBottomTabNavigator, NavigationActions } from 'react-navigation';

import AuthHomeScreen from '../../screens/AuthHome';
import AuthListScreen from '../../screens/AuthList';

const TabsStack = createBottomTabNavigator({
    AuthHome: {
        screen: AuthHomeScreen
    },
    AuthList: {
        screen: AuthListScreen
    },
}, {
    initialRouteName: 'AuthHome',
    tabBarOptions: {
        visible: false,
    },
    swipeEnabled: true,
});

export default TabsStack;
