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
import { relaySignedRequest } from "../services/relay";
import { weiToEth } from '../libraries/web3util';
import { ToastActionsCreators } from 'react-native-redux-toast';

class AuthApprovalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      hours_left: null,
      to: null,
      type: null,
      isProcessed: false,
      request: null
    }
  }

  async componentDidMount() {


  const request = this.props.navigation.state.params.request;
  console.log('Requested transaction-->', request);
  await this.setState({
      value: request.value,
      ethValue: weiToEth(request.value),
      to: request.to,
      requestType: request.type
    });
    if (request.type === 'customTransaction' || request.type === 'appTransaction'){
      await this.setState({
          txParams: {
            nonce: request.nonce,
            to: request.to,
            value: request.value,
            data: request.data
          }
        });
    }

    await this.setState({request: request});
}

  onApprove = async () => { // 
    console.log('onApprove');
    try {
      relaySignedRequest('sendTransaction', this.state.txParams,
      this.props.userName,
      this.props.privateKey,
      this.props.navigation.state.params.request_id,
      this.props.dispatch,
      this.props.navigation);
      
      this.setState({
        isProcessed: 'Approved'
      });
      this.props.dispatch(ToastActionsCreators.displayInfo('The transaction request has been approved and should complete within one minute.', 2500));
      const nav = this.props.navigation;
      setTimeout(function(){
        nav.navigate('AccountHome');
    }, 2000);
    
    }catch(e){
      this.props.dispatch(ToastActionsCreators.displayError('Unable to send transaction: ' + e));
    }

}

  onReject = async () => {
    
    await this.setState({
      isProcessed: 'Rejected'
    });

    fetchApi({
      url: 'auth/process',
      payload: {
        request_id: this.props.request_id,
        action: 'reject'
      },
      method: 'POST',
    })
      .then(response => {
        console.log('Response-->', response);
        if (response.status === 200 || response.status === 202) {
          this.setState({
            loading: false
          });
          const nav = this.props.navigation;
          this.props.dispatch(ToastActionsCreators.displayInfo('The transaction request has been successfully rejected', 2500));
          setTimeout(function(){
              nav.navigate('AccountHome');
            }, 2000);
        }else{
          this.handleError(response.error || 'Unknown Server Error');
        }

      })
      .catch(e => {
        this.handleError(e);
      });
  }

  handleError = (errorMessage) => {
    const nav = this.props.navigation;
    this.props.dispatch(ToastActionsCreators.displayError(errorMessage, 5000));
    setTimeout(function(){
        nav.navigate('AccountHome');
      }, 2000);
    this.setState({
      loading: false,
      errors: true,
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

    let renderedValue;
    let valueUnit;
    
    if (this.state.value < 10000){
      renderedValue = this.state.value;
      valueUnit = 'WEI';
    }else{
      renderedValue = this.state.ethValue;
      valueUnit = 'ETH';
    }
    let authApprovalInner;
    let toAddress;
    
    if (String(this.state.to).length < 8){
      toAddress = <Text style={styles.toAddress}>{String(this.state.to)}</Text>
    }else{
      toAddress = (
        <View>
          <Text style={styles.toAddress}>{this.ellipsisHeader(this.state.to)}...{this.ellipsisTail(this.state.to)}</Text>
      </View>
    );
    }

    if (this.state.requestType === 'customTransaction'){
      authApprovalInner = (
        <View>
        <Text style={styles.explanation}>You are going to send</Text>
        <Text style={styles.explanation}>the following transaction:</Text>

          <View style={styles.details}>
            <Text style={styles.ethAmount}>{renderedValue} {valueUnit}</Text>
            <View style={styles.to}>
              <View>
                <Text style={styles.toString}>will be sent to</Text>
              </View>
              <View style={{marginTop: 7, flexDirection: 'row'}}>
                {toAddress}
              </View>
            </View>
          </View>

        </View>
      );
      }
      let appInfo = '';
      if (this.state.request && this.state.request.app && this.state.request.app.name){
        appInfo = (
          <View>
          <Text style={styles.explanation}> Please check you are using the</Text>
          <Text style={styles.explanation}> verified {this.state.request.app.name} hosted at </Text>
          <Text style={styles.explanation_url}>{this.state.request.app.appUrl}</Text>
          </View>
        ); 
      }
    if (this.state.requestType === 'appTransaction'){
      authApprovalInner = (
        <View>
        <Text style={styles.explanation}>Wants to send a transaction</Text>
        <Text style={styles.explanation}>of the following amount:</Text>

          <View style={styles.details}>
            <Text style={styles.ethAmount}>{renderedValue} {valueUnit}</Text>
            <View style={styles.to}>
              <View>
                <Text style={styles.toString}>will be sent to</Text>
              </View>
              <View style={{marginTop: 7, flexDirection: 'row'}}>
                <Text style={styles.toAddress}>{this.ellipsisHeader(this.state.to)}</Text>
                <Text style={styles.toAddress}>...</Text>
                <Text style={styles.toAddress}>{this.ellipsisTail(this.state.to)}</Text>
              </View>
            </View>
          </View>
          {appInfo}
        </View>
      );
    }
  if (this.state.requestType === 'appSession'){
      authApprovalInner = (
        <View>
        <Text style={styles.explanation}> Is Requesting a</Text>
        <Text style={styles.explanation}>Permission:</Text>
        <View style={styles.details}>
          <Text style={styles.ethAmount}> Spend up to {renderedValue} {valueUnit} </Text>
          <Text style={styles.hoursLeft}> Expires in {this.state.hours_left} hours </Text>
        </View>
        </View>
      );
    }
    
  let transactionTitle = 'Transaction Request';
  if (this.state.app_name){
    transactionTitle = this.state.app_name;
  }
  
  let processOptions = (
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
  );
  
  if (this.state.isProcessed){
    processOptions = (<View style={styles.bothButtonContainer}>
      <Text style={styles.explanation}>{this.state.isProcessed}...</Text>
    </View>);
  }

    console.log('User name-->', this.props.userName);
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="back" right={false} backTo="AccountHome" />
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image style={styles.image} resizeMode="contain" source={require('../assets/Logo_orange_small.png')} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{transactionTitle}</Text>
            {authApprovalInner}
          </View>
              {processOptions}
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
  to: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  toString: {
    color: 'white',
    marginTop: 5,
    fontSize: 15,
    fontWeight: '300',
  },
  toAddress: {
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
  privateKey: state.auth.privateKey,
  request_id: state.auth.request_id,
});

export default connect(mapStateToProps)(AuthApprovalScreen);
