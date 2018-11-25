import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity,  Dimensions } from 'react-native'
import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import DrawerButton from './DrawerButton';
import BackButton from './BackButton';

const { width, height } = Dimensions.get('window');

class Header extends Component {

  render() {
    return (
      <View style={styles.header}>
        { this.props.left === 'nav' &&
          <DrawerButton/>
        }
        { this.props.left === 'back' &&
          <BackButton/>
        }
        <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>{this.props.title}</Text>


        { this.props.right &&
          <View style={styles.logoContainer}>
              <Image style={styles.image} resizeMode="contain" source={require('../../assets/Logo_small.png')}/>
          </View>
        }
        

      </View>
    )
  }
}


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 10,
    marginHorizontal: '2.5%',
  },
  logoContainer: {
    borderColor: 'white',
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  image: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(Header);
