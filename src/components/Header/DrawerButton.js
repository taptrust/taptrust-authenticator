import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class DrawerButton extends Component {

  navBar = () => {
      this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  render() {
    return (
        <TouchableOpacity style={styles.container} onPress={this.navBar}>
            <View style={styles.line1}/>
            <View style={styles.line2}/>
            <View style={styles.line3}/>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    top: 22,
    left: 0,
    position: 'absolute',
    padding: 10,
  },

  line1: {
    width: 25,
    marginTop: 2.5,
    height: 2,
    backgroundColor: 'white'
  },

  line2: {
    width: 22,
    marginTop: 2.5,
    height: 2,
    backgroundColor: 'white'
  },

  line3: {
    width: 19,
    marginTop: 2.5,
    height: 2,
    backgroundColor: 'white'
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default withNavigation(connect(mapStateToProps)(DrawerButton));
