import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';

class SplashScreen extends React.Component {
  componentDidMount() {
    console.log('Is loggedin-->',this.props.isLoggedIn);
  }

  render() {
    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('App');
    } else {
      this.props.navigation.navigate('Auth');
    }
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.logoContainer}>
              <Image style={styles.image}
                source={require('../assets/Logo.png')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.text}>TapTrust</Text>
            <ActivityIndicator style={{ marginTop: 20 }} size="large" color="white"/>      
          </View>
      </LinearGradient>

    );
  }
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1899cc', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  logoContainer: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  text: {
    fontSize: 35,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Helvetica',
    marginTop: 20
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 0
  }
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(SplashScreen);
