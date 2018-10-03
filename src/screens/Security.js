import React, { Component } from 'react'
import {
    StyleSheet, Text, View, Image,
    TouchableWithoutFeedback, StatusBar,
    TextInput, SafeAreaView, Keyboard, TouchableOpacity,
    KeyboardAvoidingView, Linking, Dimensions, ActivityIndicator, ScrollView
} from 'react-native'
import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

const { width, height } = Dimensions.get('window');

const alertData = {
    icon_url: 'http://www.taptrust.com/static/img/twitter@2x.png',
    address: '0x70928213bc4e7',
    name: 'Etheroll'
}

class SecurityScreen extends Component {
    constructor(props) {
      super(props);

      this.state={
          data: {
              icon_url: '#',
              address: 'NaN',
              name: 'NaN'
          }
      }
    }

    componentDidMount() {
        this.setState({
            data: alertData,
        })
    }

    ellipsisHeader = (str) => {
        let head = str.substring(0,2);
        return head;
    }

    ellipsisTail = (str) => {
        let length = str.length;
        let tail = str.substring(length-5, length-1);
        return tail;
    }
    navBar = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }
    render() {
      return (
          <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity style={{ alignSelf: 'flex-start', marginLeft: 5 }} onPress={this.navBar}>
                    <View style={{ width: 17, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                    <View style={{ width: 14, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                    <View style={{ width: 12, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                </TouchableOpacity>
                {/* <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>Offers</Text> */}
                <View style={styles.logoContainer}>
                    <Image style={styles.image} resizeMode="contain" source={require('../assets/Logo_small.png')}/>
                </View>
              </View>
              <View style={styles.content}>
                <View style={styles.topContainer}>
                    <View style={styles.titleContainer}>
                        <View style={styles.logoContainer}>              
                            <Image style={styles.titleImage} resizeMode="contain" source={require('../assets/alert_icon.png')}/>
                        </View>
                        <Text style={{ fontSize: 25, color: 'white', marginLeft: 10, alignSelf: 'center' }}>Security Alert</Text>
                    </View>
                    <View style={styles.contractAddress}>
                        <View style={styles.contractIcon}>
                            <Image style={styles.icon} resizeMode="contain" source={{ uri: this.state.data.icon_url }}/>
                        </View>
                        <View style={{ flexDirection: 'row', marginLeft: 0, }}>
                            <Text style={{ fontSize: 16, color: 'white', marginLeft: 10, alignSelf: 'center' }}>Contract</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 16, color: '#E5E3E3', marginLeft: 5, alignSelf: 'center' }}>{this.ellipsisHeader(this.state.data.address)}</Text>
                                <Text style={{ fontSize: 16, color: '#E5E3E3', marginLeft: 5, alignSelf: 'center' }}>...</Text>
                                <Text style={{ fontSize: 16, color: '#E5E3E3', marginLeft: 5, alignSelf: 'center' }}>{this.ellipsisTail(this.state.data.address)}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.securityMessage}>
                        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>
                        {this.state.data.name + ' wants permission to send funds to the contract address shown above. This contract appears to contain the following vulnerability allowing for theft of funds:'}
                        </Text>
                    </View>
                </View>
                <View style={styles.middleContainer}>
                    <Text style={{ fontSize: 21, color: 'white', marginLeft: 10, alignSelf: 'center' }}>Re-entrancy Attack</Text>
                    <Text style={{ fontSize: 15, color: '#E5E3E3', marginTop: 20, textAlign: 'center' }}>
                        {'This vulnerability may allow an attacker to'}
                    </Text>
                    <Text style={{ fontSize: 15, color: '#E5E3E3', textAlign: 'center' }}>
                        {'steal funds by making additional requests to'}
                    </Text>
                    <Text style={{ fontSize: 15, color: '#E5E3E3', textAlign: 'center' }}>
                        {'transfer funds or tokens before the'}
                    </Text>
                    <Text style={{ fontSize: 15, color: '#E5E3E3', textAlign: 'center' }}>
                        {'contract has updated its records to confirm'}
                    </Text>
                    <Text style={{ fontSize: 15, color: '#E5E3E3', textAlign: 'center' }}>
                        {'completion of a previous reqeuest.'}
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                      style={styles.buttonContainer}
                      onPress={this.onCancel}>
                      <Text style={styles.buttonText}>Cancel permission</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonContainer, {backgroundColor: '#E45353', borderRadius: 30, paddingTop: 7.5, paddingBottom: 7.5}]}
                      onPress={this.onReject}>
                      <Text style={[styles.buttonText, {fontSize: 16, color: 'white'}]}>Proceed with possibly</Text>
                      <Text style={[styles.buttonText, {fontSize: 16, color: 'white'}]}>Unsafe Permission</Text>                      
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 10,
        marginHorizontal: '2.5%',
    },
    image: {
        height: 30,
        width: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    titleImage: {
        height: 30,
        width: 30,
        justifyContent: 'center'
    },
    logoContainer: {
        //alignItems: 'flex-start',
        borderColor: 'white',
        width: 40,
        height: 40,
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
    },
    middleContainer: {
        flex: 1,
        top: 20,
        alignItems: 'center',
    },
    bottomContainer: {
        flex: 1,
        //alignItems: 'center',
        marginHorizontal: 20,
        width: '70%'        
    },
    titleContainer: {
        flexDirection: 'row'
    },
    contractAddress: {
        marginTop: 20,
        flexDirection: 'row'
    },
    contractIcon: {
        alignItems: 'center',
        //marginTop: '25%',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'white',
        width: 50,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    icon: {
        height: 40,
        width: 40,
        justifyContent: 'center'
    },
    securityMessage: {
        marginTop: 20,
    },
    buttonContainer: {
        backgroundColor: 'white',
        //marginLeft: '20%',
        //marginRight: '20%',
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 20,
        borderRadius: 30,
    },
    buttonText: {
        textAlign: 'center',
        color :'black',
        fontWeight: '300',
        fontSize: 19
    },
});

const mapStateToProps = (state) => ({
    nav: state.nav,
    isLoggedIn: state.auth.isLoggedIn,
    pubkey: state.auth.pubkey,
    userName: state.auth.userName,
});

export default connect(mapStateToProps)(SecurityScreen);

