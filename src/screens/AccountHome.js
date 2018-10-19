import React, { Component } from 'react'
import {
  StyleSheet, 
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import Header from '../components/Header';
import CreditList from '../components/CreditList';

import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

const { width, height } = Dimensions.get('window');

class AccountHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      isLoading: false,
      creditList: null,
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    fetchApi({
      url: 'auth/list',
      payload: {
        'username': this.props.userName,
      },
      method: 'post'
    })
    .then(response => {
      this.setState({
        isLoading: false,
        creditList: response.credits && response.credits,
        balances: response.balances && response.balances,
      })
      console.log('Request response-->', response);
    })
    .catch(e => {
        this.setState({
            isLoading: false,
            errors: true,
        });
    });
  }

  viewOffers = () => {
    this.props.navigation.navigate('Offers');
  }

  onApprove = () => {
    this.props.navigation.navigate('AuthHome');
  }

  onBalance = () => {
    this.props.navigation.navigate('TokenBalances', { balances: this.state.balances });
  }
  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="nav" right={true}/>
        <View style={styles.content}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Text style={styles.secure}>Secure your account</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.main}>
            {this.state.isLoading && <ActivityIndicator size="large" color="white"/>}
            {this.state.creditList && <CreditList data={this.state.creditList}/>}
          </View>
          <View style={styles.bottom}>
            <View style={styles.links}>
              <TouchableOpacity onPress={this.viewOffers}>
                <Text style={styles.textLink}>View All Offers</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onApprove}>
                <Text style={styles.textLink}>Approve Transaction</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balance}>0.00 ETH</Text>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onBalance}>
                <Text style={styles.buttonText}>Token Blanaces</Text>
              </TouchableOpacity>
            </View>
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
    flexDirection: 'column',
  },

  content: {
    flex: 1,
  },

  top: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  secure: { 
    color: 'white',
    fontSize: 17,
    textAlign: 'center',
    textDecorationLine: 'underline',
    alignSelf: 'flex-start'
  },

  main: {
    flex: 6
  },

  bottom: {
    flex: 2,
    paddingBottom: 10,
  },

  links: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  textLink : { 
    color: 'white',
    marginTop: 20,
    marginBottom: 10, 
    fontSize: 17,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  balanceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  balance: {
    color: 'white',
    fontSize: 20,
  },

  buttonContainer: {
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 30,
    marginLeft: 20,
  },

  buttonText: {
    fontSize: 18,
  }
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(AccountHomeScreen);
