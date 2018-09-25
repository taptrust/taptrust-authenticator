import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking, Alert
} from 'react-native'
import { LinearGradient } from 'expo';
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
          loginValid: null,
        }
    }

    componentDidMount() {
      this.props.isLoggedIn && this.props.navigation.navigate('AuthHome');
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

        //if(this.state.username.length > 4 && strongRegex.test(this.state.password)) {
        if(this.state.username.length > 4) {
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
                    this.props.navigation.navigate('AuthHome', { 
                        username: this.state.formData.username,
                        pubkey: this.state.formData.pubkey,
                    });
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
                        Alert.alert(
                            'Oops!',
                            'User does not exist',
                            [
                            {text: 'OK', onPress: () => this.onDefault},
                            ],
                            { cancelable: false }
                        )
                    }
                    if (response.error.indexOf('with different pubkey') !== -1) {
                        console.log('Invalid password');
                        this.setState({
                            loginValid: 1,
                        })
                        Alert.alert(
                            'Oops!',
                            'Invalid password',
                            [
                            {text: 'OK', onPress: () => this.onDefault},
                            ],
                            { cancelable: false }
                        )
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

    onDefault = () => {
        this.setState({
            isUserNameValid: true,
            isPasswordValid: true,
            loginValid: null,
        })
    }
    render() {
        console.log('Login-->', this.props.isLoggedIn);
        return (
            <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
                    <TouchableWithoutFeedback 
                            onPress={Keyboard.dismiss}>
                        <View style={styles.content}>
                            <View style={styles.logoContainer}>
                              <Image style={styles.image}
                                resizeMethod={'resize'}
                                source={require('../assets/Logo.png')}
                              />
                            </View>
                            <Text style={styles.title}>TapTrust Login</Text>                            
                            <View style={styles.infoContainer}>
                                <View style={styles.validation}>
                                    {/* {this.state.isUserNameEmpty &&
                                        <Text style={styles.usernameValidation}>Username is empty</Text>
                                    } */}
                                    {/* {!this.state.isUserNameValid &&
                                        Alert.alert(
                                            'Oops!',
                                            'Username must be at least 5 characters',
                                            [
                                            {text: 'OK', onPress: () => this.onDefault},
                                            ],
                                            { cancelable: false }
                                        )
                                    } */}
                                    {/* {this.state.isPasswordEmpty &&
                                        <Text style={styles.usernameValidation}>Password is empty</Text>
                                    } */}
                                    {/* {this.state.isUserNameValid && !this.state.isPasswordValid &&
                                        Alert.alert(
                                            'Oops!',
                                            'Password must be at least six characters and contain at least one letter, one number, and one special character',
                                            [
                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            { cancelable: false }
                                        )
                                    } */}
                                    {/* {this.state.isPasswordConfirmationEmpty && 
                                        <Text style={styles.usernameValidation}>Confirmation password is empty</Text>
                                    }
                                    {!this.state.isPasswordMatched && 
                                        <Text style={styles.usernameValidation}>Password and confirmation password do not match</Text>
                                    } */}
                                    {/* {this.state.loginValid === 0 &&
                                        Alert.alert(
                                            'Oops!',
                                            'User does not exist',
                                            [
                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                    {this.state.loginValid === 1 &&
                                        Alert.alert(
                                            'Oops!',
                                            'User does not exist',
                                            [
                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                            ],
                                            { cancelable: false }
                                        )
                                    } */}
                                </View>
                            </View>
                            <View style={styles.loginContainer}>
                                <TextInput style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onChangeText={ (uname) => this.setState({ username: uname })
                                  }
                                  placeholderTextColor='#FFF'
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
                                    placeholderTextColor='#FFF'
                                />
                                <TouchableOpacity
                                  style={styles.buttonContainer}
                                  onPress={this.onPress}>
                                  <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>

                                <View style={styles.bottomContainer}>
                                    <Text style={{
                                        color: 'white', 
                                        marginTop: 30, 
                                        textAlign: 'center',
                                        fontSize: 16,
                                        textDecorationLine: 'underline',
                                        alignContent: 'flex-start'
                                        }}
                                    onPress={() => this.props.navigation.navigate('Register')}>
                                    Create New Account
                                    </Text>
                                    <View style={styles.bottom}>
                                        <Text style={{
                                            color: 'white', 
                                            marginTop: 30, 
                                            textAlign: 'center',
                                            fontSize: 16,
                                            paddingHorizontal: 60,
                                            lineHeight: 30,
                                            }}>
                                        Your wallet contract is hosted at taptrust.eth.
                                        </Text>

                                        <Text style={{ color: 'white',
                                            marginTop: 20,
                                            marginBottom: 10, 
                                            textAlign: 'center',
                                            textDecorationLine: 'underline',
                                            }}
                                        onPress={() => Linking.openURL('http://taptrust.com/about')}>
                                        Learn More
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
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
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,

    },
    title: {
        color: 'white',
        fontSize: 26,
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
        marginTop: 20,
    },
    input: {
        height: 40,
        marginTop: 20,
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
        marginTop: 30,
        justifyContent: 'space-between'
    },
    bottom: {
        alignContent: 'flex-end'
    },
    image: {
    //   height: 100,
    //   width: 100,
      //marginBottom: '5%'
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

export default connect(mapStateToProps)(LoginScreen);