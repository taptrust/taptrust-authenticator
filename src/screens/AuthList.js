import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
	TouchableOpacity,
	Dimensions,
	TextInput,
	ScrollView,
	ActivityIndicator,
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { fetchApi } from '../services/api/index';
import { saveSession } from '../services/auth';

const { width, height } = Dimensions.get('window');
class AuthListScreen extends Component {
	constructor(props) {
		super(props);

		this.state={
			username: '',
			authList: [],
			filteredAuthList: [],
			isLoading: false,
			tabSelected: 1,
		}
	}

	componentDidMount() {
		this.setState({
			isLoading: true,
		})
		fetchApi({
			url: 'auth/list',
			payload: {
					'username': this.props.userName,
			},
			method: 'post'
		})
		.then(response => {
			console.log('Response-->', response);
			this.setState({
				isLoading: false,
				authList: response.sessions,
				filteredAuthList: response.sessions,
			})
		})
		.catch(e => {
			this.setState({
				loading: false,
				errors: true,
			});
		});
	}
	select = (val) => {
		this.setState({
			tabSelected: val,
		})
		if( val === 1 ) {
			this.setState({
				filteredAuthList: this.state.authList,
			})
		}
		if( val === 2 ) {
			let result = this.state.authList.filter(auth => {
				return auth.status === 'approved';
			});
			this.setState({
				filteredAuthList: result,
			});
		}
		if( val === 3) {
			let result = this.state.authList.filter(auth => {
				return auth.status === 'pending'; // Expired but pending for test
			});
			this.setState({
				filteredAuthList: result,
			})
		}
		console.log(val);
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

	selectItem = (item) => {
		console.log('hhh', item);
		this.props.navigation.navigate('AuthDetails', { item: item });
	}

	navBar = () => {
		this.props.navigation.dispatch(DrawerActions.openDrawer());
	}
	render() {
		return (
			<LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
				<Header left="nav" right={true}/>
				<View style={styles.searchBar}>
					<Ionicons style={{ alignSelf: 'center',}}name="ios-search" size={25} color="black"/>
					<TextInput underlineColorAndroid="transparent" style={styles.searchInput}/>
				</View>
				<View style={styles.tabView}>
					<View style={styles.tabHeader}>
						<TouchableOpacity onPress={() =>this.select(1)} style={ this.state.tabSelected === 1 ?
							[styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] :
							styles.tab
						}>
								<Text style={styles.tabText}>All</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() =>this.select(2)} style={ this.state.tabSelected === 2 ?
							[styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] :
							styles.tab
						}>
								<Text style={styles.tabText}>Approved</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() =>this.select(3)} style={ this.state.tabSelected === 3 ?
							[styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] :
							styles.tab}>
								<Text style={styles.tabText}>Expired</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.tabContent}>
						{this.state.isLoading && <ActivityIndicator size="large" color="white"/>}
						<ScrollView style={{ paddingBottom: 20 }}>
							<View>
								{this.state.filteredAuthList.map((item, i) => {
									var date = new Date(item.modified*1000);
									var time = this.getTime(date);
									var _date = this.getDate(date);
									return (
										<View style={styles.item} key={i}>
											<View style={{flex: 1, flexDirection: 'row'}}>
												<View style={{ width: 45, height: 45, borderRadius: 50, backgroundColor: 'white'}}></View>
												<View style={styles.content}>
													<Text style={styles.name}>{item.app_url}</Text>
													<Text style={styles.date}>{_date + ' / ' + time}</Text>
												</View>
											</View>
											<View style={styles.view}>
												<TouchableOpacity onPress={() => this.selectItem(item)} style={{ marginRight: 30,}}>
													<Text style={{ color: 'white', fontSize: 15, }}>View</Text>
												</TouchableOpacity>
												<TouchableOpacity onPress={() => this.selectItem(item)} style={{ marginRight: 10, }}>
													<Entypo style={{ alignSelf: 'center',}} name="chevron-small-right" size={25} color="white"/>
												</TouchableOpacity>
											</View>
										</View>
									)})
								}
							</View>
						</ScrollView>
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
		marginHorizontal: '2.5%',
	},
	searchBar: {
		marginTop: 30,
		backgroundColor: 'white',
		marginHorizontal: '2.5%',
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 8,
	},
	searchInput: {
		marginLeft: 20,
		width: width - 120,
	},
	tabView: {
		marginTop: 20,
		paddingBottom: 20,
	},
	tabHeader: {
		paddingHorizontal: '20%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomWidth: 2,
		borderColor: 'rgba(255,255,255,0.6)',
	},
	tab: {
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	tabText: {
		color: 'white'
	},
	tabContent: {
		paddingVertical: 20,
		marginBottom: 20,
	},
	item: {
		flex: 1,
		marginHorizontal: 10,
		marginBottom: 10,
		paddingHorizontal: 5,
		paddingVertical: 8,
		backgroundColor: '#2EA2E1',
		borderRadius: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	content: {
		marginLeft: 15,
	},
	name: {
		fontSize: 20,
		color: 'white',
	},
	date: {
		fontSize: 12,
		color: 'rgba(255,255,255,0.8)'
	},
	view: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		flexDirection: 'row',
	}
});

const mapStateToProps = (state) => ({
	nav: state.nav,
	isLoggedIn: state.auth.isLoggedIn,
	pubkey: state.auth.pubkey,
	userName: state.auth.userName,
});

export default connect(mapStateToProps)(AuthListScreen);
