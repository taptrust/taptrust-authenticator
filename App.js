import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import SplashScreen from './components/Splash'
import LoginScreen from './components/Login'
import RegisterScreen from './components/Register'
import AuthHomeScreen from './components/AuthHome'


export default createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
  AuthHome: {
    screen: AuthHomeScreen
  }
},{
  navigationOptions:{
    header : null
  },
});
