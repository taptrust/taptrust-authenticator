import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight,
  Modal,
  Clipboard
} from 'react-native';

import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

import Header from '../components/Header';

import WalletHeader from '../components/Wallet/WalletHeader';
import TokensList from '../components/Wallet/TokensList';
import ItemsList from '../components/Wallet/ItemsList';
import { pollServer } from '../services/api/poll';
import { fetchApi } from '../services/api/index';
import { saveRequest, saveProfile } from '../services/auth';
import { updateTxCompleted } from '../services/relay';
import { store } from '../config/store';
const { width, height } = Dimensions.get('window');

let serverPoll;

class AccountHomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      isLoading: false,
      pendingTransaction: false,
      creditList: null,
      contractAddress: null,
      tabSelected: 0,
      tokensList: false,
      addressModalVisible: false, 
      itemsList: false,
      balances: {
          totalUSD: ''
      }
    }
  }

  componentDidMount() {

     if (serverPoll){
       console.log('server poll interval already exists. Not creating.');
     }else{
       console.log('setting server poll interval');
       const username = this.props.userName;
       const nav = this.props.navigation;
       serverPoll = setInterval(function(){
          pollServer(username, nav);
      }, 10000);
     }


    this.getAccountProfile(false);
    const getProfile = this.getAccountProfile;
    const accountHome = this; 
    const isPending = this.props.navigation.getParam('pendingTransaction',false);
    const requestId = this.props.navigation.getParam('requestId',false);

    if (isPending){
      this.setState({
        pendingTransaction: true,
      });
    }
    this.storeUnsubscribe = store.subscribe(function() {
      //console.log('store_0 has been updated. Latest store state:', store_0.getState());
      const state = store.getState();

      if (state.app.isTxCompleted == requestId){
      console.log('tx is completed');
        accountHome.storeUnsubscribe();
        this.refreshTimeout = setTimeout(function(){
          let gP = getProfile.bind(accountHome);
          gP(true);
          updateTxCompleted(false);
          accountHome.setState({
            pendingTransaction: false,
          });  
        }, 5000); // increase if etherscan takes longer to update balance 

      }
      
    }); 
    
  }
  
  getAccountProfile(forceRefresh) {
    this.setState({
      isLoading: true,
    });

     let accountPayload = {
       'username': this.props.userName,
     }
     
     if (forceRefresh){
       accountPayload['forceRefresh'] = true;
       console.log("force refreshing profile");
     }

    fetchApi({
      url: 'account',
      payload: accountPayload,
      method: 'POST'
    })
    .then(response => {
      let tabSelectedValue;
      let itemsListValue;
      let tokensListValue;
      if (response.newItem === true){
        tabSelectedValue = 2;
        itemsListValue = response.items && response.items;
        tokensListValue = false;
      }else{
        tabSelectedValue = 1;
        itemsListValue = false;
        tokensListValue = response.tokens && response.tokens;
      }

      this.setState({
        isLoading: false,
        creditList: response.credits && response.credits,
        contractAddress: response.profile.contractAddress,
        tokens: response.tokens && response.tokens,
        tokensList: tokensListValue,
        tabSelected: tabSelectedValue,
        items: response.items && response.items,
        itemsList: itemsListValue, // tokensList shown by default
        balances: response.balances && response.balances
      });
      saveProfile(response.profile);
      console.log('Request response-->', response);
    })
    .catch(e => {
      console.log('error loading accounthome', e);
        this.setState({
            isLoading: false,
            errors: true,
        });
    });
  }
  
  componentWillUnmount() {
    
    if (serverPoll){
      console.log('clearing poll interval');
      clearInterval(serverPoll);
      serverPoll = null;
    }
    if (this.refreshTimeout){
      clearTimeout(this.refreshTimeout);
    }
    
    if (this.storeUnsubscribe){
      this.storeUnsubscribe();
    }
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
  
  selectItem = (item) => {
    if (item.symbol === 'ETH'){
      this.props.navigation.navigate('SendPayment', {contractAddress: this.state.contractAddress});
    }
  }

  render() {
    
    let addressModal = this.addressModal();
    
    let statusInfo = '';
    if (this.state.pendingTransaction){
      statusInfo = (
        <View style={{justifyContent: 'space-around', width:'45%', marginLeft: '27%', marginTop:-15, marginBottom: 15, flexDirection: 'row'}}>
        <Text style={{color: '#ddd', flexDirection: 'row'}}>Pending transaction...</Text> <ActivityIndicator style={{flexDirection: 'row', marginLeft: 5}} size="small" color="white"/>
        </View>
      )
    }
    
    return (
      
      
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
      
        <Header left="nav" right={false}/>
        <WalletHeader balances={this.state.balances} showAddressModal={() => this.setModalVisible(true)}/>
          <TouchableWithoutFeedback onPress={() => this.setModalVisible(false)}>
          {addressModal}
            </TouchableWithoutFeedback>
          {statusInfo}
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
              <TouchableOpacity onPress={() =>this.select(3)} style={ this.state.tabSelected === 3 ?
              [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab}>
                <Text style={ this.state.tabSelected === 3 ?
                [styles.tabText, {fontWeight: '700'}] : styles.tabText
              }>Activity</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tabInner}>
              {this.state.isLoading && <ActivityIndicator size="large" color="white"/>}
              <TokensList data={this.state.tokensList} selectItem={(item) => this.selectItem(item)}/>
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
  async copyAddressToClipboard() {
    this.setModalVisible(false);
     await Clipboard.setString(this.state.contractAddress);
  }  
  setModalVisible(visible) {
    this.setState({addressModalVisible: visible});
  }
  
addressModal() {
    return (<Modal
  animationType="slide"
  transparent={true}
  visible={this.state.addressModalVisible}
  onRequestClose={() => {
    
  }}
  style={{height:100, alignItems: 'center'}}>

    <View style={{height:250, marginTop: "40%", marginLeft: "5%", marginRight: "5%", borderRadius: 8,alignItems: 'center', backgroundColor: '#fcfcfc'}}>
    
    <View>
      <Text style={{alignItems: 'center', fontSize: 20, padding: 10}}>Your contract address:</Text>
      </View>
        <View>
      <Text style={{fontSize: 12, alignItems: 'center', padding: 10}}>{this.state.contractAddress}</Text>
        </View>
        <View style={{margin:20}}>
      <TouchableOpacity style={styles.buttonContainer, {padding: 10, borderRadius: 8, backgroundColor:'#eee'}} onPress={() => {this.copyAddressToClipboard();}}>
        <Text style={styles.buttonText}>Copy to Clipboard</Text>
      </TouchableOpacity>
        </View>
        <View style={{margin:20}}>
      <TouchableOpacity style={styles.buttonContainer, {padding: 10, borderRadius: 8, backgroundColor:'#eee'}} onPress={() => {this.setModalVisible(false);}}>
        <Text style={styles.buttonText}>Close</Text>
      </TouchableOpacity>
        </View>
  </View>
</Modal>);
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
