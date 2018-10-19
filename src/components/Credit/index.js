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

class Credit extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = (item) => {
    console.log('View offer-->');
  }

  render() {
    const { item, key } = this.props;
    return (
      <View style={styles.item} key={key}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{ width: 80, height: 80, alignItems: 'center' }}>
            <Image style={{ width: 80, height: 80 }} resizeMode="contain" source={{uri: item.icon_url}}/>
          </View>
          <View style={styles.content}>
            <Text style={styles.name}>{`${item.credit} Credit for`}</Text>
            <Text style={styles.name}>{item.name}</Text>  
            <Text style={styles.date}>{item.description}</Text>                                  
          </View>
        </View>
        <View style={styles.view}>
          <TouchableOpacity onPress={() => this.selectItem(item)} style={{ marginRight: 30,}}>
            <Text style={{ color: 'white', fontSize: 15, }}>View{'\n'}Offer</Text>
          </TouchableOpacity>
        </View>
      </View>
)
  }
}


const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 8,
    backgroundColor: '#2EA2E1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    color: 'white',
  },
  date: {
    fontSize: 14,
    marginTop: 5,
    color: 'rgba(255,255,255,0.8)'
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


export default withNavigation(connect(mapStateToProps)(Credit));

