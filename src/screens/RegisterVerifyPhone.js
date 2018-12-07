import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image,
  TouchableWithoutFeedback, StatusBar,
  TextInput, SafeAreaView, Keyboard, TouchableOpacity,
  KeyboardAvoidingView, Linking, Alert, ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import AuthHomeScreen from './AuthHome';
import { fetchApi } from '../services/api/index';
import { login } from '../services/auth';
import { notReadyAlert } from '../components/common/alerts';

var numericRegex = new RegExp("^[0-9]+$");

class RegisterVerifyPhoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
  }


componentDidMount() {
  this.setState({
    username: this.props.navigation.state.params.username
  })

  }


  validation = async () => {
    if(this.state.phoneNumber.length < 1 || !numericRegex.test(this.state.phoneNumber)){
      Alert.alert(
        'Error',
        'Please enter a valid phone number',
        [
        {text: 'OK', onPress: () => console.log('Phone number invalid')},
        ],
        { cancelable: false }
      );
      return;
    }

    /* TODO: make API call to verify phone... */
    this.props.navigation.navigate('RegisterPassword', { username: this.state.username });
  }

  onContinuePressed = () => {
    console.log('Credentials', this.state.username, this.state.password_one, this.state.password_two);
    this.validation();
  }

  onPrivacyPolicyPressed = () => {
    return notReadyAlert('Privacy Policy');
  }

  render() {
    return (
      <LinearGradient colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
          <View style={styles.topContainer}>
            <View>
            <Text style={{
              color: 'white',
              marginTop: 20,
              textAlign: 'center',
              fontSize: 12,
              alignContent: 'flex-end'
              }}
            >
            Your TapTrust Username
            </Text>
            </View>
            <View>
            <Text style={{
              color: 'white',
              marginTop: 10,
              textAlign: 'center',
              fontSize: 20,
              textDecorationLine: 'underline',
              alignContent: 'flex-end'
              }}
            onPress={() => this.props.navigation.navigate('Register')}>
            {this.state.username}
            </Text>
            </View>

          </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.instructions}>To get started, we need to verify your phone number. </Text>
            </View>
            <View style={styles.loginContainer}>
              <TextInput style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor='rgba(255,255,255,0.8)'
                keyboardType='numeric'
                returnKeyType='next'
                autoCorrect={false}
                autoFocus={true}
                selectionColor='rgba(255,165,0,0.8)'
                onChangeText={ (phone) => this.setState({ phoneNumber: phone })
                }
                placeholderTextColor='#FFF'
              />
              <View>
              <Text style={{
                color: 'white',
                marginTop: 15,
                textAlign: 'center',
                fontSize: 12,
                textDecorationLine: 'underline',
                alignContent: 'flex-start'
                }}
                onPress={this.onPrivacyPolicyPressed}
            >
              Privacy Policy
              </Text>
              </View>

              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onContinuePressed}>
                <Text style={styles.buttonText}>Send Verification Code</Text>
              </TouchableOpacity>


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
    justifyContent: 'space-between'
  },

  content: {
    marginTop: 10,
    marginHorizontal: 50,
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

  instructions: {
    color: 'white',
    fontSize: 18,
    lineHeight: 25,
    width: 250,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '400'
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
    //alignItems: 'center',
    //marginHorizontal: 50,
    marginTop: 10,
  },

  input: {
    height: 40,
    marginTop: 50,
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
    marginTop: 60,
    borderRadius: 30
  },

  buttonText: {
    textAlign: 'center',
    color : 'black',
    fontWeight: '400',
    fontSize: 19
  },

  topContainer: {
    marginBottom: 30,
    justifyContent: 'space-between'
  },

  bottom: {
    alignContent: 'flex-end'
  },

  image: {
    // height: 100,
    // width: 100,
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
});

export default connect(mapStateToProps)(RegisterVerifyPhoneScreen);
