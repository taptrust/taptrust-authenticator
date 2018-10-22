import React, { Component } from 'react'
import {
  View,  
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,   
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { fetchApi } from '../services/api/index';

class AuthApprovalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app_name: null,
      eth_amount: 0,
      icon_url: "../assets/0x-icon.png",
      hours_left: 0,
      app_url: 'https://etheroll.com/',
      recipient: null,
      type: null,
    }
  }

  async componentDidMount() {
    const request = this.props.navigation.state.params.request;
    console.log('Request-->', request);
    await this.setState({
      app_name: request.app.name,
      eth_amount: request.value,
      icon_url: request.app.icon_url,
      hours_left: !request.duration ? 0 : request.duration,
      app_url: 'https://' + request.app.url,
      recipient: request.recipient,
      type: request.type,
    })
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
        this.props.navigation.navigate('AuthList', { userName: this.props.userName});
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

  render() {
    console.log('User name-->', this.props.userName);
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="back" right={false}/>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image style={styles.image} resizeMode="contain" source={{ uri: this.state.icon_url }}/>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{this.state.app_name}</Text>
            <Text style={styles.explanation}> Is Requesting the following </Text>
            <Text style={styles.explanation}> { this.state.type === 'transaction' ? 'Transaction' : 'Permissions:' }</Text>
            {this.state.type === 'transaction' ?
              <View style={styles.details}>
                <Text style={styles.ethAmount}>{this.state.eth_amount} ETH </Text>
                <View style={styles.recipient}>
                  <Text style={styles.toString}>to </Text>
                  <Text style={styles.recipientAddress}>{this.state.recipient}</Text>                        
                </View>
              </View> :
              <View style={styles.details}>
                <Text style={styles.ethAmount}> Spend up to {this.state.eth_amount} ETH </Text>
                <Text style={styles.hoursLeft}> Expires in {this.state.hours_left} hours </Text>
              </View>
            }
            <Text style={styles.explanation}> Please check you are using the</Text>
            <Text style={styles.explanation}> verified {this.state.app_name} hosted at </Text>
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
  header: {
    marginTop: 20,
    paddingTop: 10,
  },
  content: {
    marginTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    width: 80,
    height: 80,
    alignSelf: 'center',
    justifyContent: 'center',
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
    fontWeight: '300',
    textAlign: 'center',
  },
  hoursLeft: {
    color: 'white',
    marginTop: 15,
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
  },
  recipient: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  toString: {
    color: 'white',
    marginTop: 15,
    fontSize: 15,
    fontWeight: '300',
  },
  recipientAddress: {
    color: 'white',
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
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
    height: 60,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center'
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