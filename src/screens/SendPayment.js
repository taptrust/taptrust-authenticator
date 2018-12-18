import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { fetchApi } from '../services/api/index';
import { saveRequest } from '../services/auth';
import { relaySignedRequest } from "../services/relay";
import { pollServer } from '../services/api/poll';
const { width, height } = Dimensions.get('window');

class SendPaymentScreen extends Component {
  constructor(props) {
		super(props);

		this.state={
      inputAddress: '',
      username: '',
      redirect: '',
      isAddressModalOpen: false,
      method: true,
      isRecipientAddressShown: false,
      recipientAddress: '',
      redirect: '',
      usdAmount: '',
      ethAmount: ''
		}
	}

  componentDidMount() {
    this.setState({
      username: this.props.userName,
      address: this.props.contractAddress
    });
  }


  handleAddress = () => {
    console.log('open modal');
    this.setState({
      isAddressModalOpen: true,
      inputAddress: '',
    })
  }
  
  handleSubmit = () => {


    let address;
    if(String(this.state.inputAddress).substring(0, 2) === '0x' && String(this.state.inputAddress).length > 6) {
      //address = this.addressEllipsis(this.state.inputAddress);
    } else {
      address = this.state.inputAddress;
    }
    this.setState({
      recipientAddress: String(address),
      isAddressModalOpen: false,
      method: false,
      isRecipientAddressShown: true,
    });
  
  }

  handleEscape = () => {
    this.setState({
      isAddressModalOpen: false,
      method: false,
      isRecipientAddressShown: false,
    });
  }
  handleEdit = () => {
    this.setState({
      method: true,
      isRecipientAddressShown: false
    })
  }

  addressEllipsis(address){
    var length = String(address).length;
    if (length < 8){
      return String(address);
    }
    var head = String(address).substring(0, 6);
    var tail = String(address).substring(length-5, length)

    return `${head}...${tail}`;
  }
  
  usdToETH = (usd) => {
    const value = Number.parseFloat(usd);
    if(!usd) {
      return 0;
    }
    return (value/100).toFixed(3);
  }

  ethToUSD = (eth) => {
    const value = Number.parseFloat(eth);
    if(!eth) {
      return 0;
    }
    return (value*100).toFixed(2);
  }

  usdAmountChange = (value) => {
    const eth = this.usdToETH(value);
    this.setState({
      usdAmount: String(value),
      ethAmount: String(eth),
    })
  }

  ethAmountChange = (value) => {
    const usd = this.ethToUSD(value);
    this.setState({
      usdAmount: String(usd),
      ethAmount: String(value),
    })
  }

  handleCancel = async () => {
    this.props.navigation.navigate('AccountHome');
}
    
  handleContinue = async () => {
    
    
    this.setState({
      isLoading: true,
    });
    fetchApi({
      url: 'auth/request',
      body: {
        username: this.props.userName,
        params: {
          type: "customTransaction",
          value: parseInt(parseFloat(this.state.ethAmount) * 1000000000000000000),
          to: this.state.recipientAddress
        },
      },
      method: 'POST',
    })
      .then(response => {
        console.log('Response-->', response);
        this.setState({
          isLoading: false,
        });
        let request_id = response.authRequest.request_id;
        let request = response.authRequest.params;
        request.id = request_id;
      
        saveRequest(request_id);
        this.props.navigation.navigate('AuthApproval', { request: request, request_id: request_id });
      });
      
  }

  handleMax = () => {
    //const maxValue = String(this.state.balances.totalUSD).substr(1); // Remove $ from $10.00
    const maxValue = String('$10.00').substr(1); // For test
    const eth = this.usdToETH(maxValue);
    this.setState({
      usdAmount: maxValue,
      ethAmount: eth,
    })
  }
  
  onUpdateRecipientAddress = (val) => {
      this.setState({ inputAddress: String(val) }); // val
  }

  amountFields= () => {
    //return (<View></View>);
    return (
      <View style={{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 0,
        width: '100%',
        marginBottom: -40,
      }}>
        <View style={{
          flexDirection: 'column',
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor:'rgba(200,200,200,.7)',borderBottomWidth:1}}>
            <TextInput
              placeholder="0"
              placeholderTextColor='rgba(255,255,255,0.8)'
              selectionColor='rgba(255,165,0,0.8)'
              style={{color:'white',fontSize:30}}
              value={this.state.usdAmount}
              onChangeText={(val) => this.usdAmountChange(val) }
              />
            <Text style={{color:'white', paddingLeft: 5}}>USD</Text>
          </View>
        </View>
        <View style={{
          flexDirection: 'column',
        }}>
          <View style={{flexDirection: 'row', alignItems: 'center', borderBottomColor:'white',borderBottomWidth:1}}>
            <TextInput
              placeholder="0"
              placeholderTextColor='rgba(255,255,255,0.8)'
              selectionColor='rgba(255,165,0,0.8)'
              style={{color:'white',fontSize:30}}
              value={this.state.ethAmount}
              onChangeText={(val) =>  this.ethAmountChange(val) }
              />
            <Text style={{color:'white', paddingLeft: 5}}>ETH</Text>
          </View>
        </View>
      </View>
    );
    
  }
  
  toModal = () =>  {
    //return (<View></View>);
    return (<Modal
      animationType="slide"
      transparent={true}
                  visible={this.state.isAddressModalOpen}
                  style={{marginTop:50}}
                  contentLabel="Please enter an Ethereum address, ENS Address, or TapTrust username"
                >
                <View style={{backgroundColor: 'rgba(60,60,60,.9)', margin:50,padding: 30, borderRadius: 10}}>
                  <Text style={styles.content}>
                    Please enter an Ethereum address, ENS Address, or TapTrust username
                  </Text>
                  <View/>
                  <View style={styles.container, {marginTop:30, padding:20, backgroundColor: '#333', flexDirection:'row'}}>
                    <TextInput
                      style={{color:'white',fontSize:18, width: '90%', }}
                      placeholder="Username or Address"
                      autoFocus={true}
                      placeholderTextColor='rgba(255,255,255,0.8)'
                      selectionColor='rgba(255,165,0,0.8)'
                      value={this.state.inputAddress}
                      onChangeText={this.onUpdateRecipientAddress}
                      
                    />
                  </View>
                  <View style={{marginVertical: 30, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 110}}>
                  <TouchableOpacity
                    style={styles.buttonContainer}  onPress={this.handleSubmit}>
                      <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonContainer}  onPress={this.handleEscape}>
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                </Modal>);
  }
  
  toField = () => {
    //return (<Text>To</Text>);
    return (<View style={{
paddingTop: 0,
paddingBottom:0,
flex: 1.5,
flexDirection: 'column',
alignItems: 'center',
width: '100%',
borderBottomColor: 'rgba(200,200,200,.7)',
borderBottomWidth: 1}}>            {this.state.isRecipientAddressShown &&
                  <View >
                    <View style={{flexDirection:'row', width: '90%', margin: 30, alignSelf: 'center'}} >
                      <View/>
                      <Text style={styles.content,{ flexDirection: 'row', color: 'white', fontSize: 18, padding: 10}}>{this.state.recipientAddress}</Text>
                      <TouchableOpacity
                        style={styles.buttonContainer} onPress={this.handleEdit}>
                        <Image 
                        style={{flexDirection: 'row', width: 20, height: 20}}
                          source={require('../assets/edit.png')}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>}
                {this.state.method &&
                  <View style={{        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 110,
        paddingTop:20,
        marginLeft: -10,
      paddingBottom:0,
    marginBottom:0}}>
                  <TouchableOpacity
                    style={styles.buttonContainer} onPress={this.handleAddress}>
                      <Text style={styles.buttonText, { fontSize: 15}}>ETH Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonContainer}>
                      <Text style={styles.buttonText, { fontSize: 15}}>Scan QR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonContainer}>
                      <Text style={styles.buttonText, { fontSize: 15}}>Recent</Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>);
  }
  
    basicInfo = () => {
    //return (<Text>Basic info</Text>);
    return ( <View style={{
  
      flexDirection: 'column',
      marginTop: 50,
      marginBottom: 0
    }}>        
                
                <Text style={{
                  color: 'white',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 18,
                }}>from</Text>
                <View>
                <Text style={{
                  color: 'white',
                  alignSelf: 'center',
                  textAlign: 'center',
                fontWeight:"bold", fontSize: 22}}>{this.props.userName}.taptrust.eth</Text>
                </View>
                <View style={{paddingBottom:15, borderBottomColor: "rgba(200,200,200,.7)", borderBottomWidth: 1}}>
                <Text  style={{
                  color: 'white',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 16,
                }}>{this.addressEllipsis(this.props.navigation.state.params.contractAddress)}</Text>
                </View>
                <View/>
                <View style={{marginTop:15}}>
                  <Text  style={{
                    color: 'white',
                    alignSelf: 'center',
                    textAlign: 'center',
                    fontSize: 16,
                  }}>to</Text>
                </View>
              </View>);
  }
  
  submitControls = () =>  {
  //  return (<Text>controls</Text>);
    return (
      <View style={{flex: 5, flexDirection: 'row',   alignItems: 'center', justifyContent: 'space-around' }}>
      <TouchableOpacity
        style={styles.buttonContainer} onPress={this.handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        {this.state.recipientAddress ?   <TouchableOpacity
            style={styles.buttonContainer} onPress={this.handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>:
          <TouchableOpacity
            style={styles.buttonContainer} onPress={this.handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        }
      </View>
    );
  }
  
  render() {
    
    let amountFields = this.amountFields();
    let toModal = this.toModal();
    let toField = this.toField();
    let basicInfo = this.basicInfo();
    let submitControls = this.submitControls();
    
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="back" right={false} backTo="AccountHome" title="Send Payment"/>
          <View style={styles.container}>
            {toModal}
            {basicInfo}
            {toField}
            
            <View style={styles.container}>
              
              {amountFields}
              
              <View style={{display:'none'}}>
                <View class="ml-20">
                  <Text class="label-sub b-b" onClick={this.handleMax}>Max</Text>
                </View>
              </View>
              <View style={{display:'none'}}>
                <View class="mr-20 pull-right">
                  <Text class="label-sub b-b">Advanced Options</Text>
                </View>
              </View>
            
            </View> 
            
            
            {submitControls}
            

          </View>
        
        </LinearGradient>
      )
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',

    },
    content: {
      color: 'white',
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: 14,
    },
    
    view: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
    },

    bottom: {
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center',
    },
    
    buttonContainer: {
      backgroundColor: 'white',
      alignSelf: 'center',
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 15,
      marginLeft: 20,
    },
    
    buttonText: {
      textAlign: 'center',
      color : 'black',
      fontWeight: '400',
      fontSize: 19
    },
});


const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  privateKey: state.auth.privateKey,
  userName: state.auth.userName,
  profile: state.profile,
  state: state
});

export default connect(mapStateToProps)(SendPaymentScreen);
