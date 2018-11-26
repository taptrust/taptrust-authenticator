import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  StatusBar,
	TouchableOpacity,
	Linking,
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

class AddEmailScreen extends Component {
  constructor(props) {
    super(props);
  }

  onContinue = () => {
    this.props.navigation.navigate('App');
  }

	render() {
		return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <View style={styles.content}>
            <View style={styles.topContainer}>
              <View>
                  <Text style={{
                    color: 'white',
                    marginTop: 20,
                    textAlign: 'center',
                    fontSize: 14,
                    alignContent: 'flex-end'
                    }}
                  >
                    Your TapTrust Username
                  </Text>
              </View>
          <View>
          <Text style={{
            color: 'white',
            marginTop: 5,
            textAlign: 'center',
            fontSize: 25,
            alignContent: 'flex-end'
            }}
          >
          {this.props.userName}
          </Text>
          </View>
        </View> /* end topContainer */

          <View style={styles.middleContainer}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>Add your email address</Text>
              <Text style={styles.text}>to improve account security</Text>
              <Text style={styles.text}>and get important alerts.</Text>
            </View>

          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input}
              placeholder="Email Address"
              placeholderTextColor='rgba(255,255,255,0.8)'
              keyboardType='email-address'
              returnKeyType='next'
              autoCorrect={false}
              onChangeText={ (email) => this.setState({ email: email })
              }
              placeholderTextColor='#FFF'
            />

          <Text style={{
            color: 'white',
            marginTop: 20,
            textAlign: 'center',
            fontSize: 12,
            textDecorationLine: 'underline',
            alignContent: 'flex-start'
            }}
        >
          Privacy Policy
          </Text>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Reminder') }>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={{
              color: 'white',
              marginTop: 15,
              textAlign: 'center',
              fontSize: 12,
              textDecorationLine: 'underline',
              alignContent: 'flex-start'
              }}
              onPress={() => this.props.navigation.navigate('Reminder') }
          >
            Skip This Step
            </Text>
          </View>
        </View>
      </LinearGradient>
			)
		}
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1899cc',
  },

  content: {
    flex: 1,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  middleContainer: {
    alignItems: 'center',
  },

  inputContainer: {
    alignItems: 'center',

  },

  bottomContainer: {
    marginTop: 40,
    marginHorizontal: 20,
    width: '70%'
  },

  text: {
    fontSize: 20,
    color: '#E5E3E3',
    textAlign: 'center'
  },

  input: {
    height: 40,
    marginTop: 50,
    width: 300,
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
    //marginLeft: '20%',
    //marginRight: '20%',
    marginTop:25,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 20,
    borderRadius: 30,
  },

  buttonText: {
    textAlign: 'center',
    color :'black',
    fontWeight: '300',
    fontSize: 19
  },

  topContainer: {
    marginBottom: 30,
    justifyContent: 'space-between'
  },
});

const mapStateToProps = (state) => ({
    nav: state.nav,
    isLoggedIn: state.auth.isLoggedIn,
    pubkey: state.auth.pubkey,
    userName: state.auth.userName,
    private_key: state.auth.private_key,
});

export default connect(mapStateToProps)(AddEmailScreen);
