import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions, withNavigation } from 'react-navigation';
import { weiToEth } from '../../libraries/web3util';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

class Activity extends Component {
  constructor(props) {
    super(props);
  }

  selectItem = () => {
    this.props.selectItem(this.props.item);
  }
  
  openTxLink = (item) => {
    console.log(item.txurl);
    Linking.openURL(item.txurl);
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
		var strDate = month + '/' + _date + '/' + year;
		return strDate;
	}
  
  
  txLink = (item) => {
    if (item.txurl){
      return (
        <View  style={styles.content, {flexDirection: 'row', top:'50%', width: '50%', right: -30, position: 'absolute'}}>
          <TouchableOpacity onPress={() => this.openTxLink(item)} style={{ marginRight: 8,}}>
            <Text style={{ color: '#fff', fontSize: 12, }}>View on Etherscan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.openTxLink(item)} style={{ marginLeft:-15, marginTop:-10 }}>
            <Entypo style={{ alignSelf: 'center',}} name="chevron-small-right" size={35} color="white"/>
          </TouchableOpacity>
        </View>
      );
    }else{
      return (null);
    }
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
  
  paramsInfo = (item) => {
    let toInfo = '';
    if (item.params.to){
      toInfo = (<View style={{ width: '100%', flexDirection:'row', marginVertical:5}}> <Text style={{fontSize: 12, color:'white', paddingRight:5}}>To:</Text> <Text style={styles.date}>{this.ellipsisHeader(item.params.to)}...{this.ellipsisTail(item.params.to)}</Text></View>);
    }
    let valueInfo = '';
    if (item.params.value){
      let ethValue = weiToEth(item.params.value);
      valueInfo = (<View style={{ width: '100%', flexDirection:'row', marginVertical:5}}> <Text style={{fontSize: 12, color:'white', paddingRight:5}}>Value:</Text> <Text style={styles.date}>{ethValue} ETH</Text></View>);
    }
    let dataInfo = ''
    if (item.params.data){
      dataInfo = (<View style={{ width: '100%', flexDirection:'row', marginVertical:5}}> <Text style={{fontSize: 12, color:'white', paddingRight:5}}>Data:</Text> <Text style={styles.date}>{item.params.data}</Text></View>);
    }
    
    if (item.txhash){
      return (
        <View style={styles.content, {flexDirection: 'row',  flexWrap: 'wrap', alignItems: 'flex-start', marginTop:10}}>
          {toInfo}
          {valueInfo}
          {dataInfo}
        </View>
      );
    }else{
      return (null);
    }
  }
  
  render() {
    const { item, key } = this.props;
    var date = new Date(item.created*1000);
    var time = this.getTime(date);
    var _date = this.getDate(date);
    let txLink = this.txLink(item);
    let paramsInfo = this.paramsInfo(item);
    let itemStatus = item.status[0].toUpperCase() + item.status.substring(1)
    // ['status','request_id','params','approval_signature','txhash','created','modified']
    console.log('Activity', item);
    return (
      <View style={styles.item} key={key}>
      
        <View style={{flexDirection:'column'}}>
          <View style={styles.content, {flex: 0, marginBottom:10, flexDirection: 'row'}}>
            <Text style={styles.name}>{item.description}</Text>
          </View>
          
          <View style={styles.content, {flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={styles.content, {flexDirection: 'column', alignSelf: 'flex-start'}}>>
              <Text style={styles.date}>{itemStatus} | {_date + ' ' + time}</Text>
              </View>
          </View>
        </View>
        {txLink}
        
        {paramsInfo}
      </View>
    );
    
  }
}


const styles = StyleSheet.create({
  item: {
    //flex: 1,
    marginHorizontal: 0,
    marginBottom: 10,
    marginLeft:20,
    paddingBottom: 17,
    paddingTop:10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 30,
    alignItems: 'flex-start',
    width: width - 1,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,.25)',
  },
  icon: {
    width: 45,
    height: 45,
    alignItems: 'center',
    borderRadius: 50,
  },
  content: {
    marginLeft: 15,
    alignSelf: 'center'
  },
  rightContent: {
    position: 'absolute',
    right: 10,
    top: 4,
    alignSelf: 'flex-end'
  },
  name: {
    fontSize: 18,
    color: 'white',
    fontWeight: '700',
  },
  symbol: {
    fontSize: 12,
    paddingTop:5,
    color: 'white'
  },
  balance: {
    fontSize: 17,
    color: 'white',
    fontWeight: '700'
  },
  value: {
    fontSize: 12,
    color: 'white',
    textAlign: 'right',
    paddingRight:3,
    paddingTop:3,
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  
  
	content: {
		marginLeft: 15,
	},

	date: {
		fontSize: 12,
		color: 'rgba(255,255,255,0.8)'
	},

});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});


export default withNavigation(connect(mapStateToProps)(Activity));
