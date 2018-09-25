import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import SplashScreen from '../../screens/Splash';
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';
import AuthHomeScreen from '../../screens/AuthHome';
import AuthApprovalScreen from '../../screens/AuthApproval';
import AuthListScreen from '../../screens/AuthList';
import AuthDetailsScreen from '../../screens/AuthDetails';
import DrawerScreen from '../../screens/DrawerScreen';
import TabsStack from './TabsStack';

const { width, height } = Dimensions.get('window');
const Drawer = createDrawerNavigator ({
  Login: {
    screen: LoginScreen,
  },
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

const RootNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  AuthHome: {
    screen: Drawer
  },
  AuthList: {
      screen: AuthListScreen
  },
  AuthApproval: {
    screen: AuthApprovalScreen
  },
  AuthDetails: {
    screen: AuthDetailsScreen
  }
},{
  initialRouteName: 'Login',
  navigationOptions:{
    header : null
  },
});

export default RootNavigator;