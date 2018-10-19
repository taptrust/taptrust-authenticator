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
import Credit from '../Credit';
const { width, height } = Dimensions.get('window');

class CreditList extends Component {
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
          {this.props.data.map((item, i) => {
            return (
              <Credit item={item} key={i}/>
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
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});


export default withNavigation(connect(mapStateToProps)(CreditList));

