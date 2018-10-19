import React, { Component } from 'react'
import {
  View,  
  StyleSheet,
  Text,
  Image,
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

class TestingReminderScreen extends Component {
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
          <View style={styles.middleContainer}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.text}>Thank you for trying the</Text>
              <Text style={styles.text}>beta version of our app.</Text>
            </View>
            <View style={{ marginTop: 40 }}>
              <Text style={styles.text}>Don't forget that we are</Text>
              <Text style={styles.text}>currently running on the</Text>
              <Text style={styles.text}>Ropsten testnet, and ether</Text>
              <Text style={styles.text}>or tokens you send to your</Text>
              <Text style={styles.text}>account from the mainnet</Text>
              <Text style={styles.text}>network will be lost</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
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

  buttonContainer: {
    backgroundColor: 'white',
    //marginLeft: '20%',
    //marginRight: '20%',
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
});

const mapStateToProps = (state) => ({
    nav: state.nav,
    isLoggedIn: state.auth.isLoggedIn,
    pubkey: state.auth.pubkey,
    userName: state.auth.userName,
    private_key: state.auth.private_key,
});

export default connect(mapStateToProps)(TestingReminderScreen);

