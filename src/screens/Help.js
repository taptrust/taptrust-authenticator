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
import { saveRequest } from '../services/auth';
import { relaySignedRequest } from "../services/relay";
import { pollServer } from '../services/api/poll';
import { ToastActionsCreators } from 'react-native-redux-toast';
const { width, height } = Dimensions.get('window');


class HelpScreen extends Component {
  constructor(props) {
		super(props);
		this.state={
		}
	}

  componentDidMount() {
    
    console.log(this.props.navigation);

  }


  viewSecurity = () => {
    this.props.navigation.navigate('Security');
  }

  viewAuthHome = () => {
    this.props.navigation.navigate('AuthHome');
  }

  viewAuthApproval = () => {
    this.props.navigation.navigate('AuthApproval');
  }
  

  viewInvestmentSettings = () => {
    this.props.navigation.navigate('InvestmentSettings');
  }

  addEmail = () => {
    this.props.navigation.navigate('AddEmail');
  }


  authTest = () => {
    // TODO: poll server with returnTestRequest param asking for a test TX
    let pollParams = { returnTestRequest: true };
    let username = this.props.userName;
    let navigation = this.props.navigation;
    pollServer(username, navigation, pollParams); 
    return; 
  }
  
  toastTest = () => {
    this.props.dispatch(ToastActionsCreators.displayInfo('Toast test'));
  }


  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="nav" title=""/>
        <View style={styles.view}>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.viewInvestmentSettings}>
            <Text style={{ color: 'black', fontSize: 15, }}>Investment Settings</Text>
          </TouchableOpacity>
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
            <Text style={{ color: 'black', fontSize: 15, }}>Browser Extension</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.viewAuthApproval}>
            <Text style={{ color: 'black', fontSize: 15, }}>Example Transaction Approval</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.addEmail}>
            <Text style={{ color: 'black', fontSize: 15, }}>Add Email</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer} onPress={this.authTest}>
            <Text style={{ color: 'black', fontSize: 15, }}>TX Test</Text>
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
  privateKey: state.auth.privateKey,
  userName: state.auth.userName,
  state: state
});

export default connect(mapStateToProps)(HelpScreen);
