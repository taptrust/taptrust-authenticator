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

class AuthListScreen extends Component {
    constructor(props) {
      super(props);

      this.state={
          username: '',
      }
    }

    componentDidMount() {
        let user_name = this.props.navigation.state.params.userName;
        fetchApi({
            url: 'auth/list',
            payload: {
                'username': this.props.userName,
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
    }
    render() {
      return (
          <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
              
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

export default connect(mapStateToProps)(AuthListScreen);

