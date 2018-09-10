/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Splash from './components/Splash'
import Login from './components/Login'
import React from 'react'

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = { currentScreen: "Splash" }
      setTimeout(() => {
          this.setState({ currentScreen: "Login "})
      }, 2000)
    }

    render() {
      const { currentScreen } = this.state

      let mainScreen = currentScreen === 'Splash' ? <Splash /> : <Login />
      return (
        mainScreen
      )
    }
}

AppRegistry.registerComponent('SplashLogin', () => Main);
