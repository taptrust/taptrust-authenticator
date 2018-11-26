import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

const { width, height } = Dimensions.get('window');


class HelpScreen extends Component {
  constructor(props) {
		super(props);

		this.state={
		}
	}

  componentDidMount() {

  }


  viewSecurity = () => {
    this.props.navigation.navigate('Security');
  }

  viewAuthHome = () => {
    this.props.navigation.navigate('AuthHome');
  }


  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="nav" title="Help"/>
        <View style={styles.view}>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.viewSecurity}>
            <Text style={{ color: 'black', fontSize: 15, }}>Safety Check Demo</Text>
          </TouchableOpacity>
        </View>
        <View>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.viewAuthHome}>
            <Text style={{ color: 'black', fontSize: 15, }}>Using the TapTrust Browser Extension</Text>
          </TouchableOpacity>
        </View>
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
    view: {
      padding: 20,
      flexDirection: 'row',
    },
    buttonContainer: {
      backgroundColor: 'white',
      alignSelf: 'center',
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 15,
      marginLeft: 20,
    },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(HelpScreen);
