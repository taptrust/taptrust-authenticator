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

class AuthHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      username: '',
    }
  }
  
  onAccount = () => {
    this.props.navigation.navigate('AccountHome');
  }

  onHome = () => {
    this.props.navigation.navigate('AuthHome');
  }

  onAuthList = () => {
    this.props.navigation.navigate('AuthList');
  }

  onOffers = () => {
    this.props.navigation.navigate('Offers');
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
            source={require('../assets/Logo_small.png')}
          />
        </View>
        <View style={styles.content}>
          <View style={styles.top}>
            <TouchableOpacity style={styles.option} onPress={this.onAccount}>
              <Text style={styles.text}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onHome}>
              <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onAuthList}>
              <Text style={styles.text}>Authorizations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onOffers}>
              <Text style={styles.text}>Offers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onSecurity}>
              <Text style={styles.text}>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={this.onApprove}>
              <Text style={styles.text}>Approve Transaction</Text>
            </TouchableOpacity>
          </View>

            <TouchableOpacity style={styles.logout} onPress={this.onLogout}>
              <Text style={styles.text}>Logout</Text>
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
    marginTop: 20,
  },
  image: {
  //   height: 80,
  //   width: 80,
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
    fontSize: 16,
    color: 'white'
  }
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(AuthHomeScreen);

