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

class OfferItem extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = (item) => {
    console.log('hhh', item);
    this.props.navigation.navigate('AuthDetails', { item: item });
  }

  render() {
    const { item, key } = this.props;
    return (
      <View style={styles.item} key={key}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{ width: 45, height: 45, alignItems: 'center', borderRadius: 50, backgroundColor: 'white'}}>
            <Image style={{ width: 40, height: 50 }} resizeMode="contain" source={{uri: item.icon_url}}/>
          </View>
          <View style={styles.content}>
            <Text style={styles.name}>{item.name + ': ' + item.credit}</Text>  
            <Text style={styles.date}>{item.sponsor}</Text>                                  
          </View>
        </View>
        <View style={styles.view}>
          <TouchableOpacity onPress={() => this.selectItem(item)} style={{ marginRight: 30,}}>
            <Text style={{ color: 'white', fontSize: 15, }}>View{'\n'}Offer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.selectItem(item)} style={{ marginRight: 10, }}>
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


export default withNavigation(connect(mapStateToProps)(OfferItem));

