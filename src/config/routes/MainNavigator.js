import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import AuthHomeScreen from '../../screens/AuthHome';
import AuthApprovalScreen from '../../screens/AuthApproval';
import AuthListScreen from '../../screens/AuthList';
import AuthDetailsScreen from '../../screens/AuthDetails';
import DrawerScreen from '../../screens/DrawerScreen';
import OffersScreen from '../../screens/Offers';
import SecurityScreen from '../../screens/Security';
import TabsStack from './TabsStack';

const { width, height } = Dimensions.get('window');

const Drawer = createDrawerNavigator ({
  AuthHome: {
    screen: AuthHomeScreen
  },
  AuthList: {
      screen: AuthListScreen
  },
  AuthApproval: {
    screen: AuthApprovalScreen
  },
  AuthDetails: {
    screen: AuthDetailsScreen
  },
  Offers: {
    screen: OffersScreen
  },
  Security: {
    screen: SecurityScreen
  }
},  {
  drawerWidth: width/2,
  contentComponent: DrawerScreen,
  initialRouteName: 'AuthHome',
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'white',
    labelStyle: {
      fontSize: 20,
      fontWeight: 'normal',
      fontStyle: 'normal',
      marginLeft: 0,
      paddingLeft: 0
    }
  },
  }
);

const MainNavgator = createStackNavigator({
  AuthHome: {
    screen: Drawer
  },
},{
  initialRouteName: 'AuthHome',
  navigationOptions:{
    header : null
  },
});

export default MainNavgator;
