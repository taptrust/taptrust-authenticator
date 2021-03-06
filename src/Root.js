import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from "react-navigation";

import RootNavigator from './config/routes/RootNavigator';

console.ignoredYellowBox = ['Warning: Cannot', 'Unable to symbolicate',
"Warning: The provided value 'ms-stream", "Warning: The provided value 'moz-chunked", ];

class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <RootNavigator/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
});

export default connect(mapStateToProps)(Root);
