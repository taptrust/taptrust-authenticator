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

class Item extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = (item) => {
    console.log('hhh', item);
    /* this.props.navigation.navigate('AuthDetails', { item: item }); */
  }

  render() {
    const { item, key } = this.props;
    let itemLabel;
    if (item.value > 1){
      itemLabel = 'Items';
    }else{
      itemLabel = 'Item';
    }
    return (
      <View style={styles.item} key={key}>
        <View>
          <View style={{ width: 95, height: 70, alignItems: 'center', borderRadius: 20, }}>
            <Image style={{ width: 70, height: 70, alignSelf: 'center' }} resizeMode="contain" source={{uri: item.iconUrl}}/>
          </View>
          <View style={styles.content}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.amount}>{item.value} {itemLabel}</Text>
          </View>
        </View>
      </View>
)
  }
}


const styles = StyleSheet.create({
  item: {
    marginHorizontal: 6,
    marginBottom: 10,
    paddingHorizontal: 1,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: 'center',
    flexBasis: '29%',
  },
  content: {
    marginLeft: 0,
    alignSelf: 'center'
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 10,
  },
  amount: {
    fontSize: 11,
    color: 'white',
    paddingTop: 2,
    textAlign: 'center'
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


export default withNavigation(connect(mapStateToProps)(Item));
