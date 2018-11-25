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
import BalanceList from '../components/BalanceList';

import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

const { width, height } = Dimensions.get('window');

class TokenBalancesScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      balanceList: null,
    }
  }

  componentDidMount() {
    console.log('Prop', this.props.navigation.state.params);
    const { balances } = this.props.navigation.state.params;
    this.setState({
      balanceList: balances
    })
  }

  viewVouchers = () => {
    this.props.navigation.navigate('Vouchers');
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
        <Header left="back" title="Token Balances" right={true}/>
        <View style={styles.content}>
          <View style={styles.main}>
            {this.state.balanceList && <BalanceList data={this.state.balanceList}/>}
          </View>
          <View style={styles.bottom}>
            <View style={styles.balanceContainer}>
              <TouchableOpacity style={styles.buttonContainer} onPress={this.onBalance}>
                <Text style={styles.buttonText}>Add Token</Text>
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
    flex: 6,
    paddingVertical: 30,
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

export default connect(mapStateToProps)(TokenBalancesScreen);
