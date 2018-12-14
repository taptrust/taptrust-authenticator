import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  WebView
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { fetchApi } from '../services/api/index';
import { saveRequest } from '../services/auth';
import { relaySignedRequest } from "../services/relay";
import { pollServer } from '../services/api/poll';
const { width, height } = Dimensions.get('window');


class AppBrowserScreen extends Component {
  constructor(props) {
		super(props);

		this.state={
		}
	}

  componentDidMount() {

  }
  
  
    render() {
      return (
        <LinearGradient colors={['#cccccc']} style={styles.container}>
          <View style={styles.view}>
          // navigation controls will go here 
          </View>
          <WebView
              source={{uri: 'https://www.taptrust.com'}}
              style={styles.webview}
          />
          
          </LinearGradient>
        )
      }
    }


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#cccccc',
        flexDirection: 'column',
      },
      view: {
        padding: 20,
        flexDirection: 'row',
        height: 100,
      },
      webview: {
          maxHeight: 600,
          width: '100%',
          flex: 1
      }
  });


  const mapStateToProps = (state) => ({
    nav: state.nav,
    isLoggedIn: state.auth.isLoggedIn,
    pubkey: state.auth.pubkey,
    privateKey: state.auth.privateKey,
    userName: state.auth.userName,
    state: state
  });

  export default connect(mapStateToProps)(AppBrowserScreen);


