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

import WalletHeader from '../components/Wallet/WalletHeader';
import TokensList from '../components/Wallet/TokensList';
import ItemsList from '../components/Wallet/ItemsList';

import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

const { width, height } = Dimensions.get('window');

class AccountHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      isLoading: false,
      creditList: null,
      tabSelected: 0,
      tokensList: false,
      itemsList: false,
      balances: {
          totalUSD: ''
      }
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
        tokens: response.tokens && response.tokens,
        tokensList: response.tokens && response.tokens,
        tabSelected: 1,
        items: response.items && response.items,
        itemsList: false, // tokensList shown by default
        balances: response.balances && response.balances
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

  viewVouchers = () => {
    this.props.navigation.navigate('Vouchers');
  }

  select = (val) => {
    this.setState({
      tabSelected: val,
    })
    if( val === 1 ) {
      this.setState({
         tokensList: this.state.tokens,
         itemsList: false,
       });
    }
    if( val === 2 ) {
    this.setState({
       tokensList: false,
       itemsList: this.state.items,
     });
    }
    console.log(val);
  }

  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="nav" right={false}/>
        <WalletHeader balances={this.state.balances}/>

          <View style={styles.tabView}>
            <View style={styles.tabHeader}>
              <TouchableOpacity onPress={() => this.select(1)} style={ this.state.tabSelected === 1 ?
              [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab
              }>
                <Text style={ this.state.tabSelected === 1 ?
                [styles.tabText, {fontWeight: '700'}] : styles.tabText
                }>Tokens</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>this.select(2)} style={ this.state.tabSelected === 2 ?
              [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab}>
                <Text style={ this.state.tabSelected === 2 ?
                [styles.tabText, {fontWeight: '700'}] : styles.tabText
              }>Items</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tabInner}>
              {this.state.isLoading && <ActivityIndicator size="large" color="white"/>}
              <TokensList data={this.state.tokensList}/>
              <ItemsList data={this.state.itemsList}/>
            </View>
          </View>


          <View style={styles.bottom}>
            <View style={styles.links}>
              <TouchableOpacity onPress={this.viewVouchers}>
                <Text style={styles.textLink}>Available Voucher Balance: $100</Text>
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

  main: {
    flex: 6
  },

  bottom: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
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


    tabView: {
      flex: 1,
      marginTop: 0,
      paddingBottom: 10,
      alignItems: 'center'
    },

    tabHeader: {
      paddingHorizontal: '0%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      //alignItems: 'center',
      borderBottomWidth: 2,
      borderColor: 'rgba(255,255,255,0.6)',
    },

    tabInner: {
      paddingTop:40,
    },

    tab: {
      flex: 1,
      paddingBottom: 10,
      //paddingHorizontal: 20,
      alignSelf: 'flex-end'
    },

    tabText: {
      color: 'white',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 16,
    },

    tabContent: {
      paddingVertical: 20,
      marginBottom: 20,
    },

    item: {
      //flex: 1,
      marginHorizontal: 10,
      marginBottom: 10,
      paddingHorizontal: 5,
      paddingVertical: 8,
      backgroundColor: '#2EA2E1',
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      width: width - 10,
    },

    content: {
      marginLeft: 15,
      alignSelf: 'center'
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
