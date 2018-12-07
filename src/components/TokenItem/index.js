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
import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class TokenItem extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = (item) => {
    console.log('hhh', item);
    /* this.props.navigation.navigate('AuthDetails', { item: item }); */
  }

  render() {
    const { item, key } = this.props;
    return (
      <View style={styles.item} key={key}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={styles.icon}>
            <Image style={{ width: 40, height: 50 }} resizeMode="contain" source={{uri: item.iconUrl}}/>
          </View>
          <View style={styles.content}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.symbol}>{item.symbol}</Text>

          </View>
          <View style={styles.rightContent}>
            <Text style={styles.balance}>{item.balanceUSD}</Text>
            <Text style={styles.value}>{item.value}</Text>

          </View>

        </View>

      </View>
)
  }
}


const styles = StyleSheet.create({
  item: {
    //flex: 1,
    marginHorizontal: 0,
    marginBottom: 10,
    paddingBottom: 17,
    paddingTop:10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.25)',
  },
  icon: {
    width: 45,
    height: 45,
    alignItems: 'center',
    borderRadius: 50,
  },
  content: {
    marginLeft: 15,
    alignSelf: 'center'
  },
  rightContent: {
    position: 'absolute',
    right: 10,
    top: 4,
    alignSelf: 'flex-end'
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },
  symbol: {
    fontSize: 12,
    paddingTop:5,
    color: 'white'
  },
  balance: {
    fontSize: 17,
    color: 'white',
    fontWeight: '700'
  },
  value: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    paddingRight:3,
    paddingTop:3,
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


export default withNavigation(connect(mapStateToProps)(TokenItem));
