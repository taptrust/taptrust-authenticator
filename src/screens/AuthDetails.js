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
import { connect } from 'react-redux';

import Header from '../components/Header';
import { fetchApi } from '../services/api/index';

class AuthDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      request_id: "Etheroll",
      action: null,
      ethAmount: 0.5,
      logo_url: "../assets/0x-icon.png",
      hoursLeft: 24,
      app_url: 'https://etheroll.com/',
      item: {}
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
        this.props.navigation.navigate('AuthList', { userName: this.props.userName});
      })
      .catch(e => {
        this.setState({
          loading: false,
          errors: true,
        });
      });
  }

  componentDidMount() {
    let date = new Date(this.props.navigation.state.params.item.modified * 1000);
    var time = this.getTime(date);
    var _date = this.getDate(date);
    this.setState({
      status: this.props.navigation.state.params.item.status,
      date: _date + ' ' + time,
    })
  }

  Capitalize(str){
    return !str ? null : str.charAt(0).toUpperCase() + str.slice(1);
  }

  getTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes +  ampm;
    return strTime;
  }

  getDate = (date) => {
    var _date = date.getDate();
    var month = date.getMonth() + 1; //Be careful! January is 0 not 1
    var year = date.getFullYear();
    var strDate = _date + '.' + month + '.' + year;
    return strDate;
  }

  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="back" right={false}/>        
        <View style={styles.logoContainer}>
          <Image style={styles.image} source={require("../assets/0x-icon.png")}/>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{this.state.request_id}</Text>
          <Text style={styles.explanation}> Requested the following </Text>
          <Text style={styles.explanation}> Permissions: </Text>
          <View style={styles.details}>
            <Text style={styles.ethAmount}> Spend up to {this.state.ethAmount} ETH </Text>
            <Text style={styles.hoursLeft}> Expires in {this.state.hoursLeft} hours </Text>
          </View>
          <Text style={styles.status}> {this.Capitalize(this.state.status)}</Text>
          <Text style={styles.explanation}> {this.state.date}</Text>
        </View>
        <View style={styles.bothButtonContainer}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.onApprove}>
            <Text style={styles.buttonText}>Cancel Permission</Text>
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
      paddingTop: 50,
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
    },
    status: {
        marginTop: 50,
        paddingBottom: 20,
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: '400'
    },
})

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
  session_id: state.auth.session_id,
});

export default connect(mapStateToProps)(AuthDetailsScreen);