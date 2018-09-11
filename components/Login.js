import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import SplashScreen from './Splash'
import AuthHomeScreen from './AuthHome'

export default class LoginScreen extends Component {
    constructor(props) {
      super(props);

      this.onPress = this.onPress.bind(this)
      this.state = { username: null, password: null , timePassed: false}
    }

    componentDidMount() {
      setTimeout( () => {
        this.setTimePassed();
      }, 2000)
    }

    setTimePassed() {
      this.setState({timePassed: true});
    }

    onPress = () => {
      this.props.navigation.navigate('AuthHomeScreen')
    }


    render() {
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
                                source={require('../src/fingerprint.png')}
                              />

                              <Text style={styles.title}>TapTrust Login</Text>
                            </View>
                            <View style={styles.infoContainer}>
                                <TextInput style={styles.input}
                                    placeholder="Username"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onSubmitEditing={ (uname) => this.setState({ username: uname })
                                  }
                                />
                                <TextInput style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor='rgba(255,255,255,0.8)'
                                    returnKeyType='go'
                                    secureTextEntry={true}
                                    autoCorrect={false}
                                    ref={"txtPassword"}
                                    onSubmitEditing={
                                      (pwd) => this.setState({ password: pwd })
                                    }
                                />
                                <TouchableOpacity
                                  style={styles.buttonContainer}
                                  onPress={() => this.props.navigation.navigate('AuthHomeScreen')}>
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
    }
})
