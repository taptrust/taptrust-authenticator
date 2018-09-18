import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking
} from 'react-native'
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
          session_id: 'placeholder_session_id',
          sig: 'placeholder_sig',
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
          session_id: 'placeholder_session_id',
          sig: 'placeholder_sig',
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
      return (
          <SafeAreaView style={styles.container}>
              <StatusBar barStyle="light-content" />

                <View style={styles.logoContainer}>
                    <View style={styles.logoContainer}>
                      <Image style={styles.image}
                        source={require("../assets/0x-icon.png")}
                      />

                    </View>
                </View>

                <View style={styles.infoContainer}>

                  <Text style={styles.title}>{this.state.request_id}</Text>


                  <Text style={styles.explanation}> Is requesting the following </Text>
                  <Text style={styles.explanation}> Permissions: </Text>

                  <Text style={styles.spend}> Spend up to {this.state.ethAmount} ETH </Text>

                  <Text style={styles.spend}> Expires in {this.state.hoursLeft} hours </Text>

                  <Text style={styles.explanation}> Please check you are using the</Text>
                  <Text style={styles.explanation}> verified Etheroll app hosted at </Text>
                  <Text style={styles.explanation_url}>{this.state.app_url}</Text>


                  <Text style={{color: 'white', marginTop: '5%', fontSize: 12}}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Back to login page
                  </Text>

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


          </SafeAreaView>
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
        flex: 1,
        marginBottom: '45%',
        marginTop: '10%'
    },
    infoContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20%'
    },
    title: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        marginTop: 5,
    },
    explanation: {
      textAlign: 'center',
      color: 'white'
    },
    explanation_url: {
      textAlign: 'center',
      color: 'white',
      fontWeight: '700'
    },
    buttonContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        marginBottom: 0,
        borderRadius: 10
    },
    buttonText: {
        textAlign: 'center',
        color :'rgb(32, 53, 70)',
        fontWeight: 'bold',
        fontSize: 18
    },
    image: {
      height: 100,
      width: 100,
      marginBottom: '5%'
    }
})

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  privateKey: state.auth.privateKey,
  userName: state.auth.userName,
});

export default connect(mapStateToProps)(AuthApprovalScreen);