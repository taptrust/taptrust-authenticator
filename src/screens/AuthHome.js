import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking
} from 'react-native'
import { LinearGradient } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

class AuthHomeScreen extends Component {
    constructor(props) {
      super(props);

      this.state={
          username: '',
      }
    }

    componentDidMount() {
        this.setState({
            username: this.props.navigation.state.params.username,
        })
        fetchApi({
            url: 'auth/request',
            payload: {
                'username': this.props.userName,
                'pubkey': this.props.pubkey,
                'app-url': 'test',
                'request': 'test',
            },
            method: 'post'
        })
        .then(response => {
            console.log('Response-->', response);
        // Once a pending authorization session object is returned
        // if (response.message...)
        })
        .catch(e => {
            this.setState({
                loading: false,
                errors: true,
            });
        });

        var timerId = setInterval( () => {
            console.log('Timer');
            fetchApi({
                url: 'auth/get',
                payload: {
                    username: this.props.navigation.state.params.username,
                },
                method: 'post',
            })
                .then(response => {
                    console.log('Response-->', response);
                // Once a pending authorization session object is returned
                // if (response.message...)
                    if(response.session) {
                        let session_id = response.session.session_id;
                        saveSession(session_id);
                        clearInterval(timerId);
                        this.props.navigation.navigate('AuthApproval');
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
          },10000);

    }
    onPress = () => {
        fetchApi({
            url: 'auth/get',
            payload: {
                username: 'Asdfasdf'
            },
            method: 'post',
        })
            .then(response => {
                console.log('Response-->', response);
                // Once a pending authorization session object is returned
                // if (response.message...)
                if(response.status === 200) clearInterval();
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
      return (
          <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
              <StatusBar barStyle="light-content" />

                  <TouchableWithoutFeedback style={styles.container}
                          onPress={Keyboard.dismiss}>
                      <View style={styles.logoContainer}>
                          <View style={styles.logoContainer}>
                            <Image style={styles.image}
                              source={require('../assets/fingerprint.png')}
                            />

                            <Text style={styles.username}>{this.props.userName ? this.props.userName : this.state.username}</Text>
                          </View>
                          <Text style={styles.explanation}> There are two ways to</Text>
                          <Text style={styles.explanation}> login to a dApp with your</Text>
                          <Text style={styles.explanation}> TapTrust account</Text>

                          <Text style={styles.explanationBold_one}> Use a dApp with a</Text>
                          <Text style={styles.explanationBold}> "TapTrust Login" option</Text>

                          <Text style={styles.explanation_or}> - or- </Text>

                          <Text style={styles.explanationBold_one}> Use the TapTrust</Text>
                          <Text style={styles.explanationBold}> browser extension</Text>

                          <Text style={styles.explanation_top}> Make sure this screen is </Text>
                          <Text style={styles.explanation}> visible while logging in</Text>
                          <Text style={{color: 'white', marginTop: '10%', textDecorationLine: 'underline'}}
                            onPress={() => Linking.openURL('http://taptrust.com/about')}>
                            Learn more about using TapTrust
                            </Text>
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
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: '10%',
    },
    username: {
        color: 'white',
        paddingVertical: 20,
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5,
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
    explanation: {
      color: 'white',
      fontSize: 18,
      fontWeight: '300',
    },
    explanation_or: {
      color: 'white',
      fontSize: 18,
      fontWeight: '300',
      marginTop: '5%'
    },
    explanationBold: {
      color: 'white',
      fontWeight: '700',
      fontSize: 18
    },
    explanationBold_one: {
      color: 'white',
      fontWeight: '700',
      fontSize: 18,
      marginTop: '5%'
    },
    explanation_top: {
      marginTop: '5%',
      color: 'white',
      fontSize: 18,
      fontWeight: '300'
    }
});

const mapStateToProps = (state) => ({
    nav: state.nav,
    isLoggedIn: state.auth.isLoggedIn,
    pubkey: state.auth.pubkey,
    userName: state.auth.userName,
});

export default connect(mapStateToProps)(AuthHomeScreen);

