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

  /*
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
    }) */
    await this.setState({
        app_name: 'Example App',
        eth_amount: '0.01',
        icon_url: "../assets/0x-icon.png",
        hours_left: 0,
        app_url: 'https://www.example.com',
        recipient: '0x0eEB66338d9672Ba67a4342ECE388E4026f9b43d',
        type: 'transaction',
      })
  }

  onApprove = async () => {
    return;
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
      method: 'POST',
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
    return;
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
      method: 'POST',
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

  ellipsisHeader = (str) => {
		let head = str.substring(0,4);
		return head;
	}

	ellipsisTail = (str) => {
		let length = str.length;
		let tail = str.substring(length-5, length);
		return tail;
	}

  render() {

    let authApprovalInner;

    if (this.state.type === 'transaction'){
      authApprovalInner = (
        <View>
        <Text style={styles.explanation}>Wants to send a transaction</Text>
        <Text style={styles.explanation}>of the following amount:</Text>

          <View style={styles.details}>
            <Text style={styles.ethAmount}>{this.state.eth_amount} ETH</Text>
            <View style={styles.recipient}>
              <View>
                <Text style={styles.toString}>will be sent to</Text>
              </View>
              <View style={{marginTop: 7, flexDirection: 'row'}}>
                <Text style={styles.recipientAddress}>{this.ellipsisHeader(this.state.recipient)}</Text>
                <Text style={styles.recipientAddress}>...</Text>
                <Text style={styles.recipientAddress}>{this.ellipsisTail(this.state.recipient)}</Text>
              </View>
            </View>
          </View>

        </View>
      );
    }else{
      authApprovalInner = (
        <View>
        <Text style={styles.explanation}> Is Requesting a</Text>
        <Text style={styles.explanation}>Permission:</Text>
        <View style={styles.details}>
          <Text style={styles.ethAmount}> Spend up to {this.state.eth_amount} ETH </Text>
          <Text style={styles.hoursLeft}> Expires in {this.state.hours_left} hours </Text>
        </View>
        </View>
      );
    }

    console.log('User name-->', this.props.userName);
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="back" right={false} backTo="Help" />
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image style={styles.image} resizeMode="contain" source={require('../assets/Ethroulette.png')} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{this.state.app_name}</Text>
            {authApprovalInner}
            <Text style={styles.explanation}> Please check you are using the</Text>
            <Text style={styles.explanation}> verified {this.state.app_name} hosted at </Text>
            <Text style={styles.explanation_url}>{this.state.app_url}</Text>
          </View>
          <View style={styles.bothButtonContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onApprove}>
              <Text style={styles.buttonText}>Approve Request</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.onReject}>
              <Text style={styles.buttonText}>Reject Request</Text>
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
    marginTop: 20,
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  ethAmount: {
    color: 'white',
    fontSize: 30,
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
    flexDirection: 'column',
    alignItems: 'center'
  },
  toString: {
    color: 'white',
    marginTop: 5,
    fontSize: 15,
    fontWeight: '300',
  },
  recipientAddress: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  explanation_url: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
    lineHeight:30,
  },
  bothButtonContainer: {
    paddingTop: 50,
  },
  buttonContainer: {
    backgroundColor: 'white',
    marginLeft: '20%',
    marginRight: '20%',
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 30,
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
