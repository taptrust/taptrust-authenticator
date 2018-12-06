import React, { Component } from 'react'
import {
  StyleSheet, Text, View, Image,
  TouchableWithoutFeedback, TextInput,
  Keyboard, TouchableOpacity,
  Dimensions, ActivityIndicator, ScrollView
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import TokenVouchersList from '../components/Vouchers/TokenVouchersList';
import ItemVouchersList from '../components/Vouchers/ItemVouchersList';
import Header from '../components/Header';

import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';
import { notReadyAlert } from '../components/common/alerts';
const { width, height } = Dimensions.get('window');

class VouchersScreen extends Component {
  constructor(props) {
    super(props);

    this.state={
      username: '',
      authList: [],
      vouchersList: [],
      tokenVouchersList: false,
      itemVouchersList: false,
      isLoading: false,
      tabSelected: 0,
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    fetchApi({
      url: 'voucher/list',
      payload: {
        'username': this.props.userName,
      },
      method: 'post'
    })
    .then(response => {
      this.setState({
        isLoading: false,
        tabSelected: 1,
        vouchersList: response.vouchers && response.vouchers,
        tokenVouchersList: response.vouchers.tokens,
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


  viewAppVouchers = () => {
    return notReadyAlert('App Vouchers');
  }

  select = (val) => {
    this.setState({
      tabSelected: val,
    })
    if( val === 1 ) {
      this.setState({
         tokenVouchersList: this.state.vouchersList.tokens,
         itemVouchersList: false,
       });
    }
    if( val === 2 ) {
    this.setState({
       tokenVouchersList: false,
       itemVouchersList: this.state.vouchersList.items,
     });
    }
    console.log(val);
  }

  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="nav" title="Redeem Vouchers"/>

        <View style={styles.tabView}>
          <View style={styles.tabHeader}>
            <TouchableOpacity onPress={() => this.select(1)} style={ this.state.tabSelected === 1 ?
            [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab
            }>
              <Text style={ this.state.tabSelected === 1 ?
              [styles.tabText, {fontWeight: '700'}] : styles.tabText
            }>Token Vouchers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.select(2)} style={ this.state.tabSelected === 2 ?
            [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab
            }>
              <Text style={ this.state.tabSelected === 2 ?
              [styles.tabText, {fontWeight: '700'}] : styles.tabText
            }>Item Vouchers</Text>
            </TouchableOpacity>

          </View>
          {this.state.isLoading && <ActivityIndicator size="large" color="white"/>}
          <TokenVouchersList data={this.state.tokenVouchersList}/>
          <ItemVouchersList data={this.state.itemVouchersList}/>
        </View>
        <View style={styles.bottom}>
          <View style={styles.links}>
            <TouchableOpacity onPress={this.viewAppVouchers}>
              <Text style={styles.textLink}>View App Vouchers</Text>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    marginHorizontal: '2.5%',
  },

  image: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },

  logoContainer: {
    //alignItems: 'flex-start',
    borderColor: 'white',
    width: 40,
    height: 40,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },

  searchBar: {
    marginTop: 30,
    backgroundColor: 'white',
    marginHorizontal: '2.5%',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  searchInput: {
    marginLeft: 20,
    width: width - 120,
  },

  tabView: {
    flex: 1,
    marginTop: 40,
    paddingBottom: 10,
    alignItems: 'center'
  },

  tabHeader: {
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
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
    fontSize: 14,
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

  name: {
    fontSize: 16,
    color: 'white',
  },

  date: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)'
  },

  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
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

});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(VouchersScreen);
