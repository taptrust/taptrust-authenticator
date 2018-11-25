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
import Item from '../Item';
const { width, height } = Dimensions.get('window');

class ItemsList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    console.log('Data', this.props.data);
  }
  render() {
    return (

      <View style={styles.tabContent}>
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1,flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.props.data.map((item, i) => {
              return (
                <Item item={item} key={i}/>
              )})
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    marginLeft:15,
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});


export default withNavigation(connect(mapStateToProps)(ItemsList));
