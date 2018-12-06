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

class ItemVoucher extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = (item) => {
    console.log('hhh', item);
  /*  this.props.navigation.navigate('AuthDetails', { item: item }); */
  }

  render() {
    const { item, key } = this.props;
    return (
      <View style={styles.item} key={key} onPress={() => this.selectItem(item)} >
        <View style={{flex: 1, flexDirection: 'row'}}>

          <View style={styles.content}>
            <Text style={styles.name}>Item: {item.name}</Text>
            <Text style={styles.sponsor}>Sponsored by {item.sponsor}</Text>
          </View>
        </View>
        <View style={styles.view}>
          <TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>{item.value}  <Text style={{ color: 'rgba(255,255,255,.3)' }}>|</Text>  {item.symbol}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 10, }}>
            <Entypo style={{ alignSelf: 'center',}} name="chevron-small-right" size={25} color="white"/>
          </TouchableOpacity>
        </View>
      </View>
)
  }
}


const styles = StyleSheet.create({
  item: {
    //flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 8,
    borderRadius: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: width - 30,
    borderBottomColor: 'rgba(255,255,255,.3)',
    borderRadius: 20,
    borderBottomWidth: 1
  },
  content: {
    marginLeft: 15,
    alignSelf: 'center'
  },
  name: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  sponsor: {
    paddingTop: 5,
    fontSize: 12,
    color: '#D8D8D8'
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


export default withNavigation(connect(mapStateToProps)(ItemVoucher));
