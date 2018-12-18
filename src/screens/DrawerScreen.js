import React, { Component } from 'react'
import {
  StyleSheet, Text, View, Image,
  TouchableWithoutFeedback, StatusBar,
  TextInput, SafeAreaView, Keyboard, TouchableOpacity,
  KeyboardAvoidingView, Linking
} from 'react-native'
import { LinearGradient } from 'expo';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchApi } from '../services/api/index';
import { logout } from '../services/auth';
import { notReadyAlert } from '../components/common/alerts';

class AuthHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      username: '',
    }
  }

  onAccountHome = () => {
    this.props.navigation.navigate('AccountHome');
  }

  onHome = () => {
    this.props.navigation.navigate('AuthHome');
  }

  onApps = () => {
    return notReadyAlert('App Browser');
    //this.props.navigation.navigate('AppBrowser');
  }
  
  onExtension = () => {
    //return notReadyAlert('App Browser');
    this.props.navigation.navigate('AuthHome');
  }

  onVouchers = () => {
    this.props.navigation.navigate('Vouchers');
  }

  onHelp = () => {
    return notReadyAlert('Support');
    //this.props.navigation.navigate('Help');
  }

  onSettings = () => {
      return notReadyAlert('Account Settings');
  }

  onSecurity = () => {
    this.props.navigation.navigate('Security');
  }

  onApprove = () => {
    this.props.navigation.navigate('AuthHome');
  }

  onLogout = () => {
    logout();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.image}
            resizeMethod={'resize'}
            source={require('../assets/Logo_orange_small.png')}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.top}>
            <TouchableOpacity style={styles.option} onPress={this.onAccountHome}>
              <Text style={styles.text}>My Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onVouchers}>
              <Text style={styles.text}>Redeem Vouchers</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={this.onApps}>
              <Text style={styles.text}>Browse Apps</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onExtension}>
              <Text style={styles.text}>Browser Extension</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onSettings}>
              <Text style={styles.text}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onHelp}>
              <Text style={styles.text}>Help</Text>
            </TouchableOpacity>
          </View>

            <TouchableOpacity style={styles.logout} onPress={this.onLogout}>
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0499ED',
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    height: 80,
    width: 80,
  },
  content: {
    flex: 4,
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  top: {
    alignSelf: 'flex-start',
  },
  option: {
    marginTop: 20,
  },

  logout: {
    marginBottom: 30,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontWeight: '700',
  }
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(AuthHomeScreen);
