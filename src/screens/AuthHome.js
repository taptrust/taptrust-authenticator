import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
	TouchableOpacity,
	Linking,
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

class AuthHomeScreen extends Component {
	constructor(props) {
		super(props);

		this.state={
				username: '',
		}
	}

	componentDidMount() {
			this.setState({
					username: this.props.userName
			})
			fetchApi({
					url: 'auth/request',
					payload: {
							'username': this.props.userName,
							'pubkey': this.props.pubkey,
							'app-url': 'test',
							'request': 'test',
					},
					method: 'post'
			})
			.then(response => {
					console.log('Request response-->', response);
			})
			.catch(e => {
					this.setState({
							loading: false,
							errors: true,
					});
			});

			// var timerId = setInterval( () => {
			//     console.log('Timer');
			//     try {fetchApi({
			//         url: 'auth/get',
			//         payload: {
			//             username: this.props.userName
			//         },
			//         method: 'post',
			//     })
			//         .then(response => {
			//             console.log('Timer Response-->', response);
			//             if(response.session) {
			//                 clearInterval(timerId);
			//                 let session_id = response.session.session_id;
			//                 let request = response.session.request;
			//                 saveSession(session_id);
			//                 this.props.navigation.navigate('AuthApproval', { request: request });
			//             }
			//             this.setState({
			//                 loading: false,
			//             });
			//         })
			//         .catch(e => {
			//             this.setState({
			//                 loading: false,
			//                 errors: true,
			//             });
			//         });} catch(e) {
			//             Alert.alert(e);
			//         }
			//   },10000);

	}

	reFresh = () => {
		try {
			fetchApi({
				url: 'auth/get',
				payload: {
					username: this.props.userName
				},
				method: 'post',
		})
		.then(response => {
			console.log('Timer Response-->', response);
			if(response.session) {
				let session_id = response.session.session_id;
				let request = response.session.request;
				saveSession(session_id);
				this.props.navigation.navigate('AuthApproval', { request: request });
			}
			this.setState({
				loading: false,
			});
		})
		.catch(e => {
			this.setState({
				loading: false,
				errors: true,
			});
		});} catch(e) {
			Alert.alert(e);
		}
	}

	render() {
		return (
			<LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.mainContainer}>
				<Header left="nav" right={false}/>
				<View style={styles.container}>

						<View style={styles.content}>
							<View style={{ alignItems: 'center' }}>
								<Text style={styles.explanation}>Want to use TapTrust Wallet to</Text>
								<Text style={styles.explanation}>interact with online Ethereum apps</Text>
								<Text style={styles.explanation}>and send custom transactions?</Text>
							</View>
							<View style={{ alignItems: 'center', marginTop: 50 }}>
								<Text style={styles.explanationBold}>Install one of these</Text>
								<Text style={styles.explanationBold}>browser extensions:</Text>
							</View>
              <View style={{ alignItems: 'center', marginTop: 50 }}>
              <TouchableOpacity style={styles.buttonContainer}>
              <Image style={styles.buttonImage}
                resizeMethod={'resize'}
                source={require('../assets/Chrome.png')}
              />
                <Text style={styles.buttonText}>TapTrust for Chrome</Text>
              </TouchableOpacity>
              </View>
							<Text style={styles.explanation_or}> - or - </Text>
							<View style={{ alignItems: 'center', marginTop: 15 }}>
              <TouchableOpacity style={styles.buttonContainer}>
              <Image style={styles.buttonImage}
                resizeMethod={'resize'}
                source={require('../assets/Firefox.png')}
              />
                <Text style={styles.buttonText}>TapTrust for Firefox</Text>
              </TouchableOpacity>
							</View>
							<View style={{ alignItems: 'center', marginTop: 50 }}>
								<Text style={styles.approvalExplanation}>Transactions made from the browser need to be</Text>
								<Text style={styles.approvalExplanation}>approved with TapTrust Wallet on your mobile device.</Text>
							</View>
						</View>

				</View>
			</LinearGradient>
			)
		}
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1899cc',
        flexDirection: 'column',
    },
    container: {
			flex: 1,
			paddingVertical: 50,
			justifyContent: 'space-between'
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
		},
		content: {
			alignItems: 'center',
			justifyContent: 'space-between'
		},
		bottom: {
			alignItems: 'center',
			justifyContent: 'center'
		},
    username: {
        color: 'white',
        paddingVertical: 20,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
    infoContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20,
        marginBottom: 0
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#FFF',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 20
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
    //   height: 100,
    //   width: 100,
    //   marginBottom: '5%'
    },
    approvalExplanation: {
      color: 'white',
      fontSize: 14,
      fontWeight: '400',
      textAlign: 'center',
      padding: 3,
    },
    explanation: {
      color: 'white',
      fontSize: 18,
      fontWeight: '400',
      padding: 3,
    },
    explanation_or: {
      color: 'white',
      fontSize: 18,
      fontWeight: '400',
      marginTop: 25,
      marginBottom: 10
    },
    explanationBold: {
      color: 'white',
      fontWeight: '700',
      fontSize: 20
    },
    explanationBold_one: {
      color: 'white',
      fontWeight: '700',
      fontSize: 18,
    },
    explanation_top: {
      marginTop: '5%',
      color: 'white',
      fontSize: 18,
      fontWeight: '300'
		},
		link: {
			color: 'white',
			marginTop: '10%',
			textDecorationLine: 'underline',
			fontSize: 16,
		},
    buttonContainer: {
      backgroundColor: 'white',
      alignSelf: 'center',
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: 25,
      marginLeft: 0,
    },
    buttonText: {
       color: 'black',
       fontSize: 20,
       paddingLeft:40,
       paddingTop:10,
       paddingBottom:10,
       paddingRight:10,
    },
    buttonImage: {
      height: 30,
      width: 30,
      position:'absolute',
      top: 14,
      left: 10,
    },
});

const mapStateToProps = (state) => ({
    nav: state.nav,
    isLoggedIn: state.auth.isLoggedIn,
    pubkey: state.auth.pubkey,
    userName: state.auth.userName,
    private_key: state.auth.private_key,
});

export default connect(mapStateToProps)(AuthHomeScreen);
