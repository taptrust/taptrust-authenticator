import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'

import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class WalletHeader extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { balances, userName, showAddressModal } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{balances.totalUSD}</Text>
        </View>
        <View style={styles.usernameContainer}>
          <TouchableOpacity onPress={showAddressModal} >
          <Text style={styles.usernameText}>{userName}</Text>
          <Text style={styles.addressText}>{userName}.taptrust.eth</Text>
          </TouchableOpacity>
        </View>


      </View>
)
  }
}


const styles = StyleSheet.create({
  container: {

  },
  totalContainer: {
    marginLeft: 10,

  },
  totalText: {
    fontSize: 22,
    color: 'white',
    position: 'absolute',
    right: 4,
    marginTop: -8,

  },
  usernameContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 8,
    alignItems: 'center',
  },
  usernameText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: 'white',
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  }
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});


export default withNavigation(connect(mapStateToProps)(WalletHeader));
