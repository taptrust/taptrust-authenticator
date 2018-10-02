import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking
} from 'react-native'
import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
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
            username: this.props.userName
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
            console.log('Request response-->', response);
        })
        .catch(e => {
            this.setState({
                loading: false,
                errors: true,
            });
        });

        var timerId = setInterval( () => {
            console.log('Timer');
            try {fetchApi({
                url: 'auth/get',
                payload: {
                    username: this.props.userName
                },
                method: 'post',
            })
                .then(response => {
                    console.log('Timer Response-->', response);
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
                });} catch(e) {
                    Alert.alert(e);
                }
          },10000);

    }

    navBar = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    reFresh = () => {
        try {fetchApi({
                url: 'auth/get',
                payload: {
                    username: this.props.userName
                },
                method: 'post',
            })
                .then(response => {
                    console.log('Timer Response-->', response);
                    if(response.session) {
                        let session_id = response.session.session_id;
                        let request = response.session.request;
                        saveSession(session_id);
                        this.props.navigation.navigate('AuthApproval', { request: request });
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
                });} catch(e) {
                    Alert.alert(e);
                }
    }
    render() {
      return (
          <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.mainContainer}>
              <StatusBar barStyle="light-content" />
              <View style={styles.header}>
                <TouchableOpacity style={{ marginLeft: 5 }} onPress={this.navBar}>
                    <View style={{ width: 17, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                    <View style={{ width: 14, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                    <View style={{ width: 12, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                </TouchableOpacity>
              </View>
                  <TouchableWithoutFeedback style={styles.container}
                          onPress={Keyboard.dismiss}>
                      <View style={styles.logoContainer}>
                          <View style={styles.logoContainer}>
                            <Image style={styles.image}
                              source={require('../assets/Logo_small.png')}
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
                            onPress={() => Linking.openURL('http://taptrust.com/about')}>Learn more about using TapTrust
                            </Text>
                            <TouchableOpacity onPress={this.reFresh} style={{ marginRight: 10, marginTop: 10 }}>
                            <Ionicons style={{ alignSelf: 'center',}} name="md-refresh" size={30} color="white"/>
                            </TouchableOpacity>
                          </View>
                  </TouchableWithoutFeedback>

          </LinearGradient>
        )
      }
    }


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1899cc',
        flexDirection: 'column',
    },
    container: {
        
    },
    header: {
        marginTop: 20,
        paddingTop: 10,
        marginHorizontal: '2.5%',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    username: {
        color: 'white',
        paddingVertical: 20,
        fontSize: 25,
        fontWeight: 'bold',
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
    //   height: 100,
    //   width: 100,
    //   marginBottom: '5%'
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

