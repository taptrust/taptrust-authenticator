import React, { Component } from 'react'
import {
  StyleSheet, Text, View, Image,
  TouchableWithoutFeedback, StatusBar,
  TextInput, SafeAreaView, Keyboard, TouchableOpacity,
  KeyboardAvoidingView, Linking, Alert, ActivityIndicator
} from 'react-native'

import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import SplashScreen from './Splash';
import AuthHomeScreen from './AuthHome';

import { fetchApi } from '../services/api/index';
import { login } from '../services/auth';
import { restoreKeyPair, generateKeys } from '../libraries/auth';

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

class LoginScreen extends Component {
  constructor(props) {
  super(props);

  this.state = {
    username: '',
    password: '',
    isUserNameValid: true,
    isPasswordValid: true,
    isUserNameEmpty: false,
    isPasswordEmpty: false,
    formData: {
      username: '',
      pubkey: '',
    },
    privateKey: '',
    loginValid: null,
    isLoading: false,
    }
  }

  componentDidMount() {
    this.setState({
        formData: {},
        privateKey: null,
      });
  }

  onLogin = () => {
    this.validation();
  }

  validation = async () => {
    if(this.state.username.length == 0) {
      this.setState({
        isUserNameEmpty: true,
        isUserNameValid: true,
        isPasswordValid: true,
      });
      return;
    }

    if(this.state.username && this.state.username.length > 4) {
      this.setState({
        isUserNameValid: true,
        isUserNameEmpty: false,
      });
    }

    //if(this.state.username.length > 4 && strongRegex.test(this.state.password)) {
    this.setState({
      isLoading: true,
    });
    fetchApi({
      url: 'login',
      payload: {
        getPublicKey: this.state.username
      },
      method: 'POST',
    })
      .then(response => {
        console.log('Response-->', response);
        console.log(response.error);
        if (response.status === 200 || response.status === 202) {
          this.restoreKeys(response.pubkey);
        }else{
          console.log('Unable to get public key for user ' + this.state.username);
            this.setState({
              loginValid: 0,
              isLoading: false
            });
            Alert.alert(
              'Login Failed',
              response.error,
              [
              {text: 'OK', onPress: () => this.onDefault},
              ],
              { cancelable: false }
            );
         }


      });


  }

  restoreKeys = (pubkey) => {
    console.log('Attempting to restore keys');
    let keys;
    console.log('random factors: ' + this.props.randomFactors);
    if (this.props.randomFactors && this.props.randomFactors[this.state.username]){

      keys = generateKeys(this.state.username,
        this.state.password, parseInt(this.props.randomFactors[this.state.username]));
      if (!keys){
        console.error('no keys returned with random factor provided!');
      }
    }
    if (!keys){
      console.log('no random factor found');
      Alert.alert(
        'Secure Login',
        'This process helps to secure your account and may take a couple minutes to complete.',
        [
        {text: 'Continue'},
        ],
        { cancelable: false }
      );
      keys = restoreKeyPair(this.state.username, this.state.password, pubkey);
    }

    if (!keys.publicKey || keys.publicKey != pubkey){ // second condition is from using random factor
      console.log('Invalid password');
      this.setState({
        loginValid: 1,
        isLoading: false,
      })
      Alert.alert(
        'Error',
        'Invalid password',
        [
        {text: 'OK', onPress: () => this.onDefault},
        ],
        { cancelable: false }
      );
      return;
    }
    this.setState({
    formData: {
      username: this.state.username,
      pubkey: keys.publicKey,
    },
    privateKey: keys.privateKey,
    randomFactor: keys.randomFactor,
    });
    console.log('Keys-->', keys);
    this.completeLogin();
  }

  completeLogin = () => {
    console.log('All valid');

    this.setState({
      loginValid: null,
      isLoading: false,
    });
    let payload = {
      formData: this.state.formData,
      privateKey: this.state.privateKey,
      randomFactor: this.state.randomFactor
    };
    login(payload);
    this.props.navigation.navigate('Reminder');

  }

  onDefault = () => {
    this.setState({
      isUserNameValid: true,
      isPasswordValid: true,
      loginValid: null,
    });
  }

  render() {
    console.log('Login-->', this.state.password, this.state.username);
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Image style={styles.image} resizeMethod={'resize'} source={require('../assets/Logo_orange_small.png')}/>
              <Text style={styles.title}>Sign Into Your TapTrust Account</Text>
            </View>
            <View style={styles.loginContainer}>
              <TextInput underlineColorAndroid="transparent" style={styles.input}
                placeholder="Username"
                placeholderTextColor='rgba(255,255,255,0.8)'
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                selectionColor='rgba(255,165,0,0.8)'
                onChangeText={ (uname) => this.setState({ username: uname })
              }
              placeholderTextColor='#FFF'
              />
              <TextInput underlineColorAndroid="transparent" style={styles.input}
                placeholder="Password"
                placeholderTextColor='rgba(255,255,255,0.8)'
                returnKeyType='go'
                secureTextEntry={true}
                autoCorrect={false}
                selectionColor='rgba(255,165,0,0.8)'
                ref={"txtPassword"}
                onChangeText={
                (pwd) => this.setState({ password: pwd })
                }
                placeholderTextColor='#FFF'
              />
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.bottomContainer}>
                <Text style={{
                  color: 'white',
                  marginTop: 40,
                  textAlign: 'center',
                  fontSize: 20,
                  textDecorationLine: 'underline',
                  alignContent: 'flex-start'
                  }}
                onPress={() => this.props.navigation.navigate('Register')}>
                Create New Account
                </Text>
                <View style={styles.bottom}>
                <Text style={{
                  color: 'white',
                  marginTop: 15,
                  textAlign: 'center',
                  fontSize: 12,
                  textDecorationLine: 'underline',
                  alignContent: 'flex-start'
                  }}
              >
                Forgot Your Password?
                </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.isLoading &&
        <ActivityIndicator style={styles.indicator} size="large"/> }
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1899cc',
    flexDirection: 'column',
    paddingTop: 20,
  },

  content: {
    marginTop: 10,
    marginHorizontal: 50,
    justifyContent: 'space-between'
  },

  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  title: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '400',
    width:200,
  },

  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20,
    marginBottom: 0
  },

  loginContainer: {
    marginBottom: 20,
  },

  input: {
    height: 40,
    marginTop: 40,
    color: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#FFF',
    fontWeight: '400',
    textAlign: 'center',
  },

  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    marginTop: 40,
    borderRadius: 30
  },

  buttonText: {
    textAlign: 'center',
    color : 'black',
    fontWeight: '400',
    fontSize: 19
  },

  bottomContainer: {
    marginTop: 10,
    justifyContent: 'space-between'
  },

  bottom: {
    alignContent: 'flex-end'
  },

  image: {
     height: 100,
     width: 100,
    // marginBottom: '5%'
  },

  validation: {
    marginBottom: 20,
  },

  usernameValidation: {
    color: 'red',
    alignSelf: 'center',
  }
})

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
  randomFactors: state.auth.randomFactors
});

export default connect(mapStateToProps)(LoginScreen);
