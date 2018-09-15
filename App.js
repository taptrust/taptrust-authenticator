import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import SplashScreen from './src/screens/Splash'
import LoginScreen from './src/screens/Login'
import RegisterScreen from './src/screens/Register'
import AuthHomeScreen from './src/screens/AuthHome'
import AuthApprovalScreen from './src/screens/AuthApproval'


export default createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  AuthHome: {
    screen: AuthHomeScreen
  },
  AuthApproval: {
    screen: AuthApprovalScreen
  }
},{
  navigationOptions:{
    header : null
  },
});
