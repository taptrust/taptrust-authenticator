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

class RegisterVerifyPhoneCodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      verificationKey: '',
    };
  }


componentDidMount() {
  this.setState({
    username: this.props.navigation.state.params.username,
    verificationKey: this.props.navigation.state.params.verificationKey
  })

  }


  validation = async () => {
    let numericLength  = this.state.verificationCode.match(/\d/g).length;
    if (numericLength != 4){
      Alert.alert(
        'Error',
        'Please enter a valid verification code',
        [
        {text: 'OK', onPress: () => console.log('Verification code invalid')},
        ],
        { cancelable: false }
      );
      return;
    }
    console.log('calling API');
    fetchApi({
      url: 'auth/verifyPhone',
      payload: {
        key: this.state.verificationKey,
        code: this.state.verificationCode
      },
      method: 'post',
    })
      .then(response => {
        this.props.navigation.navigate('RegisterPassword', { username: this.state.username,
            phoneVerificationKey: this.state.verificationKey });
        // console.log('Response-->', response);
        //     this.setState({
        //       isLoading: false
        //     });
        //     if (response.error) {
        //       Alert.alert(
        //         'Error',
        //         response.error,
        //         [
        //         {text: 'OK'},
        //         ],
        //         { cancelable: false }
        //       );
        //       this.refs.verificationCode.value = '';
        //       return;
        //     }else{
        //       this.props.navigation.navigate('RegisterPassword', { username: this.state.username,
        //         phoneVerificationKey: this.state.verificationKey });
        //     }

      })
      .catch(e => {
        console.log('error', e);
              this.setState({
                  isLoading: false,
                  errors: true,
              });

              Alert.alert(
                'Error',
                'Invalid Code',
                [
                {text: 'OK'},
                ],
                { cancelable: false }
              );
              this.refs.verificationCode.value = '';
              return;
          });



  }

  onContinuePressed = () => {
    this.validation();
  }

  onPrivacyPolicyPressed = () => {
    return notReadyAlert('Privacy Policy');
  }

  onChangeText = (code) => {
    this.setState({ verificationCode: code });
    if (code.length == 4){

    }
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
              <Text style={styles.instructions}>Enter the code that was sent to you in a text message. </Text>
            </View>
            <View style={styles.loginContainer}>
              <TextInput underlineColorAndroid="transparent" style={styles.input}
                ref="verificationCode"
                placeholder="Verification Code"
                placeholderTextColor='rgba(255,255,255,0.8)'
                keyboardType='numeric'
                returnKeyType='next'
                maxLength={4}
                autoCorrect={false}
                autoFocus={true}
                selectionColor='rgba(255,165,0,0.8)'
                onChangeText={this.onChangeText}
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
                <Text style={styles.buttonText}>Continue</Text>
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
    fontSize: 30,
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

export default connect(mapStateToProps)(RegisterVerifyPhoneCodeScreen);
