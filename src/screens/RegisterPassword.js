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
import { generateKeys } from '../services/crypto';

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

class RegisterPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password_one: '',
      password_two: '',
      isUserNameValid: true,
      isPasswordValid: true,
      isUserNameEmpty: false,
      isPasswordEmpty: false,
      isPasswordConfirmationEmpty: false,
      isPasswordMatched: true,
      formData: {
        username: '',
        pubkey: '',
      },
      private_key: '',
      isLoading: false,
    };
  }


componentDidMount() {
  this.setState({
    username: this.props.navigation.state.params.username
  })

  }


  register = () => {
    console.log('All valid');
    this.setState({
      isLoading: true,
    })
    fetchApi({
      url: 'register',
      payload: this.state.formData,
      method: 'post',
    })
      .then(response => {
        console.log('Response-->', response);
        this.setState({
          loginValid: null,
          isLoading: false,
        })
        let payload = {
          formData: this.state.formData,
          private_key: this.state.private_key
        }
        login(payload);
        this.props.navigation.navigate('AddEmail'); /* CreatingAccount */
      })
      .catch(e => {
        this.setState({
          loading: false,
          errors: true,
        });
      });
  }

  validation = async () => {
    if((!strongRegex.test(this.state.password_one) || !strongRegex.test(this.state.password_two))) {
      this.setState({
        isUserNameValid: true,
        isUserNameEmpty: false,
      })
      Alert.alert(
        'Error',
        'Password must be at least six characters and contain at least one letter, one number, and one special character',
        [
        {text: 'OK', onPress: () => console.log('Password invalid')},
        ],
        { cancelable: false }
      );
      return;
    }
    if(this.state.password_two !== this.state.password_one) {
      this.setState({
        isPasswordMatched: false,
      })
      Alert.alert(
        'Error',
        'Password and confirmed password do not match',
        [
        {text: 'OK', onPress: () => console.log('Password invalid')},
        ],
        { cancelable: false }
      );
      return;
    }

    let keys = generateKeys(this.state.username, this.state.password_one);
    await this.setState({
      formData: {
        username: this.state.username,
        pubkey: keys.public_key,
      },
      private_key: keys.private_key,
    });
    console.log('Keys-->', keys);
    this.register();

  }

  onContinuePressed = () => {
    console.log('Credentials', this.state.username, this.state.password_one, this.state.password_two);
    this.validation();
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
              <Text style={styles.instructions}>The final step in creating your account is to set a password. </Text>
            </View>
            <View style={styles.loginContainer}>
            <TextInput style={styles.input}
              placeholder="Password"
              placeholderTextColor='rgba(255,255,255,0.8)'
              returnKeyType='go'
              secureTextEntry={true}
              clearTextOnFocus={false}
              autoCorrect={false}
              ref={"txtPassword"}
              onChangeText={
                (pwd) => this.setState({ password_one: pwd })
              }
              value={this.state.password_one}
              placeholderTextColor='#FFF'
            />
            <TextInput style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor='rgba(255,255,255,0.8)'
              returnKeyType='go'
              secureTextEntry={true}
              clearTextOnFocus={false}
              autoCorrect={false}
              ref={"txtPassword"}
              onChangeText={
                (pwd) => this.setState({ password_two: pwd })
              }
              value={this.state.password_two}
              placeholderTextColor='#FFF'
            />
            <View>
            <Text style={{
              color: 'white',
              marginTop: 55,
              textAlign: 'center',
              fontSize: 12,
              textDecorationLine: 'underline',
              alignContent: 'flex-start'
              }}
          >
            Password Requirements
            </Text>
            </View>
            <View>
            <Text style={{
              color: 'white',
              marginTop: 10,
              textAlign: 'center',
              fontSize: 12,
              alignContent: 'flex-start'
              }}
          >
            Must be 8 or more characters and include at least one letter, number, and special character.
            </Text>
            </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.onContinuePressed}>
                <Text style={styles.buttonText}>Finish Account Setup</Text>
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
    marginTop: 0,
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
  state: state,
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(RegisterPasswordScreen);
