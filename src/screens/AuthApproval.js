import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking
} from 'react-native';
import { LinearGradient } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchApi } from '../services/api/index';

class AuthApprovalScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        request_id: "Etheroll",
        action: null,
        ethAmount: 0.5,
        logo_url: "../assets/0x-icon.png",
        hoursLeft: 24,
        app_url: 'https://etheroll.com/'
      }
    }

    onApprove = async () => {
      await this.setState({
        formData: {
          session_id: this.props.session_id,
          sig: 'test',
          action: 'approve'
        }
      });

      fetchApi({
        url: 'auth/process',
        payload: this.state.formData,
        method: 'post',
      })
        .then(response => {
            console.log('Response-->', response);
        })
        .catch(e => {
            this.setState({
                loading: false,
                errors: true,
            });
        });
    }

    onReject = async () => {
      await this.setState({
        formData: {
          session_id: this.props.session_id,
          sig: 'test',
          action: 'reject'
        }
      });

      fetchApi({
        url: 'auth/process',
        payload: this.state.formData,
        method: 'post',
      })
        .then(response => {
            console.log('Response-->', response);
        })
        .catch(e => {
            this.setState({
                loading: false,
                errors: true,
            });
        });
    }

    componentDidMount() {
    }
    render() {
      console.log('session_id-->', this.props.session_id);
      return (
          <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
              <StatusBar barStyle="light-content" />

                <View style={styles.logoContainer}>
                  <Image style={styles.image} source={require("../assets/0x-icon.png")}
                  />
                </View>

                <View style={styles.infoContainer}>

                  <Text style={styles.title}>{this.state.request_id}</Text>


                  <Text style={styles.explanation}> Is Requesting the following </Text>
                  <Text style={styles.explanation}> Permissions: </Text>

                  <View style={styles.details}>
                    <Text style={styles.ethAmount}> Spend up to {this.state.ethAmount} ETH </Text>
                    <Text style={styles.hoursLeft}> Expires in {this.state.hoursLeft} hours </Text>
                  </View>

                  <Text style={styles.explanation}> Please check you are using the</Text>
                  <Text style={styles.explanation}> verified Etheroll app hosted at </Text>
                  <Text style={styles.explanation_url}>{this.state.app_url}</Text>

                </View>

                <View style={styles.bothButtonContainer}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.onApprove}>
                    <Text style={styles.buttonText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={this.onReject}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>


          </LinearGradient>
        )
      }
    }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1899cc',
        flexDirection: 'column',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: '25%',
    },
    infoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    title: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        marginTop: 5,
        paddingBottom: 20,
    },
    explanation: {
      textAlign: 'center',
      color: 'white',
      fontSize: 15,
      fontWeight: '400'
    },
    details: {
      paddingTop: 30,
      paddingBottom: 30,
    },
    ethAmount: {
      color: 'white',
      fontSize: 21,
      textAlign: 'center',
    },
    hoursLeft: {
      color: 'white',
      marginTop: 15,
      fontSize: 20,
      fontWeight: '300',
      textAlign: 'center',
    },
    explanation_url: {
      textAlign: 'center',
      color: 'white',
      fontWeight: '700'
    },
    bothButtonContainer: {
      paddingTop: 30,
    },
    buttonContainer: {
        backgroundColor: 'white',
        marginLeft: '20%',
        marginRight: '20%',
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        borderRadius: 20,
    },
    buttonText: {
        textAlign: 'center',
        color :'black',
        fontWeight: '300',
        fontSize: 18
    },
    image: {
      height: 100,
      width: 100,
    }
})

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
  session_id: state.auth.session_id,
});

export default connect(mapStateToProps)(AuthApprovalScreen);