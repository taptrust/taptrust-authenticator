import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import SplashScreen from '../../screens/Splash';
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';
import AuthHomeScreen from '../../screens/AuthHome';
import AuthApprovalScreen from '../../screens/AuthApproval';
import AuthListScreen from '../../screens/AuthList';

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
  },
  AuthList: {
    screen: AuthListScreen
  }
},{
  navigationOptions:{
    header : null
  },
});
