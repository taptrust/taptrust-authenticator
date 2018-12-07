import React from 'react';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import SplashScreen from '../../screens/Splash';
import LoginScreen from '../../screens/Login';
import RegisterScreen from '../../screens/Register';
import RegisterVerifyPhoneScreen from '../../screens/RegisterVerifyPhone';
import RegisterVerifyPhoneCodeScreen from '../../screens/RegisterVerifyPhoneCode';
import RegisterPasswordScreen from '../../screens/RegisterPassword';
import AddEmailScreen from '../../screens/AddEmail';

const AuthNavigator = createStackNavigator({
    Login: {
      screen: LoginScreen,
    },
    Register: {
      screen: RegisterScreen
    },
    RegisterVerifyPhone: {
      screen: RegisterVerifyPhoneScreen
    },
    RegisterVerifyPhoneCode: {
      screen: RegisterVerifyPhoneCodeScreen
    },
    RegisterPassword: {
      screen: RegisterPasswordScreen
    },
    AddEmail: {
      screen: AddEmailScreen
    },
  },{
    initialRouteName: 'Login',
    navigationOptions:{
      header : null
    },
});

export default AuthNavigator;
