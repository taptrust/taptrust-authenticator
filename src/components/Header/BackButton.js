import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { DrawerActions, withNavigation } from 'react-navigation';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

class BackButton extends Component {

  back = () => {
      if (this.props.backTo){
        this.props.navigation.navigate(this.props.backTo);
      }else{
        this.props.navigation.goBack();
      }
  }

  render() {
    return (
        <TouchableOpacity style={styles.container} onPress={this.back}>
          <Entypo style={styles.icon} name="chevron-small-left" size={35} color="white"/>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    left: 0,
    top: 10,
  },
  icon: {
    alignSelf: 'center'
  }
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default withNavigation(connect(mapStateToProps)(BackButton));
