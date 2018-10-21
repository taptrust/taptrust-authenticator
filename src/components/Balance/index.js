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

class Balance extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = (item) => {
    console.log('Buy-->');
  }

  render() {
    const { item, key } = this.props;
    return (
      <View style={styles.item} key={key}>
        <View style={styles.main}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.valueText}>{item.value}</Text>
          </View>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} resizeMode="contain" source={{uri: item.icon_url}}/>
              </View>
              <Text style={styles.name}>{item.name}</Text>              
            </View>
            <Text style={styles.usd}>{`${item.usd} USD`}</Text>
          </View>
        </View>
        <View style={styles.view}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.selectItem(item)}>
            <Text style={{ color: 'black', fontSize: 15, }}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>
)
  }
}


const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#2EA2E1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  content: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  valueText: {
    color: 'white',fontSize: 25
  },
  logoContainer: {
    width: 30,
    height: 30,
    alignItems: 'center'
  },
  logo: {
    width: 30,
    height: 30
  },
  name: {
    fontSize: 24,
    color: 'white',
    marginLeft: 10
  },
  usd: {
    fontSize: 20,
    color: '#D8D8D8',
    marginTop: 10
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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


export default withNavigation(connect(mapStateToProps)(Balance));

