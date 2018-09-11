import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import SplashScreen from './components/Splash'
import LoginScreen from './components/Login'
import RegisterScreen from './components/Register'


export default createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen
  },
},{
  navigationOptions:{
    header : null
  },
});
