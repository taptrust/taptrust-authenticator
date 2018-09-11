import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking
} from 'react-native'
import { createStackNavigator } from 'react-navigation';
import SplashScreen from './Splash'

export default class AuthHomeScreen extends Component {
    constructor(props) {
      super(props);
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
                              source={require('../src/fingerprint.png')}
                            />

                            <Text style={styles.title}>my_username</Text>
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

                              <Text style={{color: 'white', marginTop: '7%'}}
                                onPress={() => Linking.openURL('http://taptrust.com/about')}>
                                Learn more about using TapTrust
                              </Text>
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
        marginBottom: '45%',
        marginTop: '5%'
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 5,
        opacity: 0.9,
        marginBottom: '10%'
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
})
