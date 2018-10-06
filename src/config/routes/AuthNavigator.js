import React from 'react';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import SplashScreen from '../../screens/Splash';
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';

const AuthNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen
    },
  },{
    initialRouteName: 'Login',
    navigationOptions:{
      header : null
    },
});

export default AuthNavigator;