import React, { Component } from 'react';
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking
} from 'react-native';
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
        if(this.state.username.length > 0 && strongRegex.test(this.state.password_one)) {
            this.setState({
                isPasswordValid: true,
            })
        }
        if(this.state.username.length > 0 && !strongRegex.test(this.state.password_one)) {
            this.setState({
                isPasswordValid: false,
            })
        }
        if(this.state.username.length > 0 && this.state.password_one.length == 0) {
            this.setState({
                isPasswordEmpty: true,
                isPasswordMatched: false,
            })
        }
        if(this.state.username.length > 0 && this.state.password_two.length == 0) {
            this.setState({
                isPasswordConfirmationEmpty: true,
                isPasswordMatched: false,
            })
        }
        if(this.state.username.length > 0 && this.state.password_two !== this.state.password_one) {
            this.setState({
                isPasswordMatched: false,
            })
        }
        if(this.state.username.length > 0 && this.state.password_two == this.state.password_one) {
            this.setState({
                isPasswordMatched: true,
            })
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
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                    <TouchableWithoutFeedback style={styles.container}
                            onPress={Keyboard.dismiss}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoContainer}>
                              <Image style={styles.image}
                                source={require('../assets/fingerprint.png')}
                              />
                              <Text style={styles.title}>Create Your Account</Text>
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
                                    placeholder="Enter Password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                    onChangeText={
                                      (pwd) => this.setState({ password_one: pwd })
                                    }
                                    value={this.state.password_one}
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
                                />
                                <TouchableOpacity onPress={this.onRegisterPressed} style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Create Account</Text>
                                </TouchableOpacity>

                                <Text style={{color: 'white', marginTop: 10}}
                                  onPress={() => this.props.navigation.navigate('Login')}>
                                  Already have an account? Login
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1899cc',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        marginBottom: '55%',
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
        borderRadius: 10
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
