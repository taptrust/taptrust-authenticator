import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking, Alert
} from 'react-native';
import { LinearGradient } from 'expo';
import AuthHomeScreen from './AuthHome';
import { fetchApi } from '../services/api/index';
import { login } from '../services/auth';

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

export default class RegisterScreen extends Component {
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
          }
        };
    }

    validation = async () => {
        if(this.state.username.length > 0 && this.state.username.length < 5) {
            this.setState({
                isUserNameValid: false,
                isUserNameEmpty: false,
            })
            Alert.alert(
                'Oops!',
                'Username must be at least 5 characters',
                [
                {text: 'OK', onPress: () => console.log('Username invalid')},
                ],
                { cancelable: false }
            )
        }
        if(this.state.username.length > 4 && (!strongRegex.test(this.state.password_one) || !strongRegex.test(this.state.password_two))) {
            this.setState({
                isUserNameValid: true,
                isUserNameEmpty: false,
            })
            Alert.alert(
                'Oops!',
                'Password must be at least six characters and contain at least one letter, one number, and one special character',
                [
                {text: 'OK', onPress: () => console.log('Password invalid')},
                ],
                { cancelable: false }
            )
        }
        if(this.state.username.length > 0 && strongRegex.test(this.state.password_one) && strongRegex.test(this.state.password_two) && this.state.password_two !== this.state.password_one) {
            this.setState({
                isPasswordMatched: false,
            })
            Alert.alert(
                'Oops!',
                'Password and confirmed password should be same',
                [
                {text: 'OK', onPress: () => console.log('Password invalid')},
                ],
                { cancelable: false }
            )
        }
        if(this.state.username.length > 4 && strongRegex.test(this.state.password_one) && 
            strongRegex.test(this.state.password_two) && this.state.password_one == this.state.password_two) {
                await this.setState({
                    formData: {
                        username: this.state.username,
                        pubkey: this.state.password_one,
                    }
                })                
                this.register();
        }
    }

    register = () => {
        console.log('All valid');
        fetchApi({
            url: 'register',
            payload: this.state.formData,
            method: 'post',
        })
            .then(response => {
                console.log('Response-->', response);
                this.props.navigation.navigate('AuthHome');
                login(this.state.formData);
                
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

    onRegisterPressed = () => {
        console.log('Credentials', this.state.username, this.state.password_one, this.state.password_two);
        this.validation();
    }
    render() {
        return (
            <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
                    <TouchableWithoutFeedback 
                            onPress={Keyboard.dismiss}>
                        <View style={styles.content}>
                            <View style={styles.logoContainer}>
                              <Image style={styles.image}
                                resizeMethod={'resize'}
                                source={require('../assets/Logo_small.png')}
                              />
                            </View>
                            <Text style={styles.title}>Create Your Account</Text>                            
                            <View style={styles.infoContainer}>
                                <View style={styles.validation}>
                                    {/* {this.state.isUserNameEmpty &&
                                        <Text style={styles.usernameValidation}>Username is empty</Text>
                                    } */}
                                    {/* {!this.state.isUserNameValid &&
                                        <Text style={styles.usernameValidation}>Username must be at least 5 characters</Text>
                                    } */}
                                    {/* {this.state.isPasswordEmpty &&
                                        <Text style={styles.usernameValidation}>Password is empty</Text>
                                    } */}
                                    {/* {!this.state.isPasswordValid &&
                                        <Text style={styles.usernameValidation}>Password must be at least six characters and contain at least one letter, one number, and one special character</Text>
                                    } */}
                                    {/* {this.state.isPasswordConfirmationEmpty && 
                                        <Text style={styles.usernameValidation}>Confirmation password is empty</Text>
                                    }
                                    {!this.state.isPasswordMatched && 
                                        <Text style={styles.usernameValidation}>Password and confirmation password do not match</Text>
                                    } */}
                                    {/* {this.state.loginValid === 0 &&
                                        <Text style={styles.usernameValidation}>User does not exist</Text>                                    
                                    }
                                    {this.state.loginValid === 1 &&
                                        <Text style={styles.usernameValidation}>Invalid password</Text>                                    
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
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                    onChangeText={
                                      (pwd) => this.setState({ password_two: pwd })
                                    }
                                    value={this.state.password_two}
                                    placeholderTextColor='#FFF'
                                />
                                <TouchableOpacity
                                  style={styles.buttonContainer}
                                  onPress={this.onRegisterPressed}>
                                  <Text style={styles.buttonText}>Create Account</Text>
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
                                    Have an account? Log In
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
                                            fontSize: 14,
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
        marginTop: 30,
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