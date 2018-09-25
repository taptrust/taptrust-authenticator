import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo';


export default class SplashScreen extends React.Component {

  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={{ flex: 1, backgroundColor: '#1899cc' }}>
          <View style={{flex: 2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

            <Image style={styles.image}
              source={require('../assets/fingerprint.png')}
            />

            <Text style={styles.text} >
              TapTrust
            </Text>
          </View>

      </LinearGradient>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1899cc'
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Helvetica',
    marginTop: 50
  },
  image: {
    width: 135,
    height: 135,
    marginTop: 0
  }
});