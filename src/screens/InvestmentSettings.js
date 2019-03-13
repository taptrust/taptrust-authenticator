import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Slider
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import Header from '../components/Header';

import { fetchApi } from '../services/api/index';
import { saveRequest } from '../services/auth';

const { width, height } = Dimensions.get('window');

const alertData = {
	icon_url: 'http://www.taptrust.com/static/img/art/cryptopunks.png',
	address: '0x70928213bc4e7',
	name: 'EthRoulette'
}

const SLIDERS = {
  ETH: {
    description: 'ETH is the currency securing the Ethereum blockchain. It may be good to hold ETH if you predict increasing adoption of Ethereum apps.'
  },
  USD: {
    description: 'A stablecoin pegged to the US dollar is a conservative investment if you would like to avoid the volatility of cryptocurrency.'
  },
  Alpha: {
    description: 'A weight-adjusted bucket of the 10 Ethereum utility tokens with the greatest market cap, rebalanced and recalculated every 24 hours.'
  },
}
class InvestmentSlider extends Component {
  
  constructor(props) {
		super(props);

		this.state={
      value: this.props.value
    };
	}
  
  onValueChange(value) {
    this.setState((state, props) => ({ value: value }))
  }
  
  render() {
    let percentage = `${this.state.value}%`;
    let sliderDescriptionText = SLIDERS[this.props.type]['description'];
    return (
      <View style={styles.sliderContainer}>
      <Text style={styles.sliderPercentage}>{percentage}</Text>
      <Slider
     minimumValue={1}
     maximumValue={100}
     minimumTrackTintColor="#1EB1FC"
     maximumTractTintColor="#1EB1FC"
     step={1}
     value={this.props.value}
     onValueChange={value => this.onValueChange(value)}
     style={styles.slider}
     thumbTintColor="#1EB1FC"
   />
   <View style={styles.sliderLabel}>
   <Image style={{ width: 30, height: 30 }} resizeMode="contain" source={require('../assets/Ethroulette.png')}/>
   <Text style={styles.sliderLabelText}>{this.props.type}</Text>
   </View>
   <View style={styles.sliderDescriptionContainer}>
    <Text style={styles.sliderDescription}>{sliderDescriptionText}</Text>
   </View>
   </View>
 );
  }
}

class InvestmentSettingsScreen extends Component {
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
		let head = str.substring(0,4);
		return head;
	}

	ellipsisTail = (str) => {
		let length = str.length;
		let tail = str.substring(length-5, length);
		return tail;
	}

	render() {
    let sliders = ["ETH","USD","Alpha"].map((item, index) => {
        let sliderValue = 50;
        return (
          <InvestmentSlider type={item} key={index} value={sliderValue} />
        )
    });
		return (
			<LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
				<Header left="back" right={false} backTo="Help"/>
				<View style={styles.content}>
					<View style={styles.topContainer}>
						<View style={styles.titleContainer}>
							<Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>Investment Settings</Text>
						</View>
					</View>
					<View style={styles.middleContainer}>
            {sliders}
					</View>
					<View style={styles.bottomContainer}>
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
    flex: 8,
    alignSelf: 'flex-start',
    width: '100%',
    marginLeft: 30, 
    marginTop: -30,
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

  sliderContainer: {
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 400,
    height: 100
  },

  sliderPercentage: {
    width: 60,
    fontSize: 23,
    color: 'white'
  },
    
  sliderLabel: {
    width: 80,
    right: 50,
    top:33,
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  
  slider: {
    
    marginTop: 0,
    width: 200,
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

  sliderLabelText: {
    color :'white',
    fontWeight: '300',
    paddingLeft: 10,
    fontSize: 23
  },

  sliderDescriptionContainer: {
    position: 'absolute',
    width: 300,
    alignSelf: 'center',
    top:70,
    left: 30
  },
    
  sliderDescription: {
    color: 'white',
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

export default connect(mapStateToProps)(InvestmentSettingsScreen);
