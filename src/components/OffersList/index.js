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
import OfferItem from '../OfferItem';
const { width, height } = Dimensions.get('window');

class OffersList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.tabContent}>
        <ScrollView style={{flex: 1}}>
            {this.props.data.map((item, i) => {
              return (
                <OfferItem item={item} key={i}/>
              )})
            }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    //height: 400,
    paddingVertical: 20,
    //marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});


export default withNavigation(connect(mapStateToProps)(OffersList));
