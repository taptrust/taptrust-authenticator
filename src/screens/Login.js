import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking, AsyncStorage
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import SplashScreen from './Splash'
import AuthHomeScreen from './AuthHome'

import { fetchApi } from '../services/api/index';
import { login } from '../services/auth';
// var bitcore = require('bitcore-lib');
// var EthereumBip44 = require('ethereum-bip44');
// create a new master private key

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

class LoginScreen extends Component {
    constructor(props) {
      super(props);

      this.onPress = this.onPress.bind(this)
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
          timePassed: false,
          loginValid: null,
        }
    }

    componentDidMount() {
      setTimeout( () => {
        this.setTimePassed();
      }, 2000);
      this.props.isLoggedIn && this.props.navigation.navigate('AuthHome');
    }

    setTimePassed() {
      this.setState({timePassed: true});
    }

    onPress = () => {
      this.validation();
    }

    validation = async () => {
        if(this.state.username.length == 0) {
            this.setState({
                isUserNameEmpty: true,
                isUserNameValid: true,
                isPasswordValid: true,
            })
        }
        if(this.state.username.length > 0 && this.state.username.length < 5) {
            this.setState({
                isUserNameValid: false,
                isUserNameEmpty: false,
            })
        }
        if(this.state.username && this.state.username.length > 4) {
            this.setState({
                isUserNameValid: true,
                isUserNameEmpty: false,
            })
        }
        if(this.state.username.length > 0 && strongRegex.test(this.state.password)) {
            this.setState({
                isPasswordValid: true,
            })
        }
        if(this.state.username.length > 0 && !strongRegex.test(this.state.password)) {
            this.setState({
                isPasswordValid: false,
            })
        }

        if(this.state.username.length > 4 && strongRegex.test(this.state.password)) {
                await this.setState({
                    formData: {
                        username: this.state.username,
                        pubkey: this.state.password,
                    }
                })                
                this.login_to();
        }
    }

    login_to = () => {
        console.log('All valid');
        fetchApi({
            url: 'login',
            payload: this.state.formData,
            method: 'post',
        })
            .then(response => {
                console.log('Response-->', response);
                if (response.status === 200 || response.status === 202) {
                    this.props.navigation.navigate('AuthHome');
                    login(this.state.formData);
                    this.setState({
                        loginValid: null,
                    })
                }
                if (response.status === 406) {
                    if (response.error.indexOf('does not exist') !== -1) {
                        console.log('Does not exit');
                        this.setState({
                            loginValid: 0,
                        })
                    }
                    if (response.error.indexOf('with different pubkey') !== -1) {
                        console.log('Invalid password');
                        this.setState({
                            loginValid: 1,
                        })
                    }
                }
                this.setState({
                    loading: false,
                });
            })
            .catch(e => {
                this.setState({
                    loading: false,
                    errors: true,
                });
            });
    }

    render() {
        console.log('Login-->', this.props.isLoggedIn);
      if (!this.state.timePassed) {
        return <SplashScreen />
      } else {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                    <TouchableWithoutFeedback style={styles.container}
                            onPress={Keyboard.dismiss}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoContainer}>
                              <Image style={styles.image}
                                source={require('../assets/fingerprint.png')}
                              />

                              <Text style={styles.title}>TapTrust Login</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.validation}>
                                    {/* {this.state.isUserNameEmpty &&
                                        <Text style={styles.usernameValidation}>Username is empty</Text>
                                    } */}
                                    {!this.state.isUserNameValid &&
                                        <Text style={styles.usernameValidation}>Username must be at least 5 characters</Text>
                                    }
                                    {/* {this.state.isPasswordEmpty &&
                                        <Text style={styles.usernameValidation}>Password is empty</Text>
                                    } */}
                                    {!this.state.isPasswordValid &&
                                        <Text style={styles.usernameValidation}>Password must be at least six characters and contain at least one letter, one number, and one special character</Text>
                                    }
                                    {/* {this.state.isPasswordConfirmationEmpty && 
                                        <Text style={styles.usernameValidation}>Confirmation password is empty</Text>
                                    }
                                    {!this.state.isPasswordMatched && 
                                        <Text style={styles.usernameValidation}>Password and confirmation password do not match</Text>
                                    } */}
                                    {this.state.loginValid === 0 &&
                                        <Text style={styles.usernameValidation}>User does not exist</Text>                                    
                                    }
                                    {this.state.loginValid === 1 &&
                                        <Text style={styles.usernameValidation}>Invalid password</Text>                                    
                                    }
                                </View>
                                <TextInput style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onChangeText={ (uname) => this.setState({ username: uname })
                                  }
                                />
                                <TextInput style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                    onChangeText={
                                      (pwd) => this.setState({ password: pwd })
                                    }
                                />
                                <TouchableOpacity
                                  style={styles.buttonContainer}
                                  onPress={this.onPress}>
                                  <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>

                                <Text style={{color: 'white', marginTop: 10}}
                                  onPress={() => this.props.navigation.navigate('Register')}>
                                  Create New Account
                                </Text>

                                <Text style={{color: 'white', marginBottom: 10}}
                                  onPress={() => Linking.openURL('http://taptrust.com/about')}>
                                  Learn More
                                </Text>
                            </View>


                        </View>
                    </TouchableWithoutFeedback>

            </SafeAreaView>
        )
      }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1899cc',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        marginBottom: '45%',
        marginTop: '5%'
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9,
        marginBottom: '5%'
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
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        marginBottom: 0,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    },
    image: {
      height: 100,
      width: 100,
      marginBottom: '5%'
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
    privateKey: state.auth.privateKey,
    userName: state.auth.userName,
});

export default connect(mapStateToProps)(LoginScreen);
