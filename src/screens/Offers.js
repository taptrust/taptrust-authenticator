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

const offersList = [
    {
        icon_url: 'http://www.taptrust.com/static/img/twitter@2x.png',
        name: 'Collectible dApp',
        amount: '10',
        description: 'Sponsored by dApp center',
        type: 'gaming_collectible'
    },
    {
        icon_url: 'http://www.taptrust.com/static/img/twitter@2x.png',
        name: 'Milos dApp',
        amount: '25',
        description: 'Sponsored by dApp center',
        type: 'gaming_collectible'
    },
    {
        icon_url: 'http://www.taptrust.com/static/img/twitter@2x.png',
        name: 'Wow dApp',
        amount: '40',
        description: 'Sponsored by dApp center',
        type: 'marketplaces'
    },
    {
        icon_url: 'http://www.taptrust.com/static/img/twitter@2x.png',
        name: 'Great dApp',
        amount: '99',
        description: 'Sponsored by dApp center',
        type: 'marketplaces'
    },
];
class OffersScreen extends Component {
    constructor(props) {
      super(props);

      this.state={
          username: '',
          authList: [],
          filteredAuthList: offersList,
          isLoading: false,
          tabSelected: 0,
      }
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
            filteredAuthList: offersList,
        })
    }
    select = (val) => {
        this.setState({
            tabSelected: val,
        })
        if( val === 1 ) {
            this.setState({
                filteredAuthList: offersList,
            })
        }
        if( val === 2 ) {
            let result = offersList.filter(offer => {
                return offer.type === 'gaming_collectible';
            });
            this.setState({
                filteredAuthList: result,
            });
        }
        if( val === 3) {
            let result = offersList.filter(offer => {
                return offer.type === 'marketplaces'; // Expired but pending for test
            }); 
            this.setState({
                filteredAuthList: result,
            })
        }
        console.log(val);
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
              <View style={styles.header}>
                <TouchableOpacity style={{ alignSelf: 'flex-start', marginLeft: 5 }} onPress={this.navBar}>
                    <View style={{ width: 17, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                    <View style={{ width: 14, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                    <View style={{ width: 12, marginTop: 2.5, height:2, backgroundColor: 'white'}}/>
                </TouchableOpacity>
                <Text style={{ fontSize: 25, color: 'white', alignSelf: 'center' }}>Offers</Text>
                <View style={styles.logoContainer}>
                    <Image style={styles.image} resizeMode="contain" source={require('../assets/Logo_small.png')}/>
                </View>
              </View>
              <View style={styles.searchBar}>
                <Ionicons style={{ alignSelf: 'center',}}name="ios-search" size={25} color="black"/>
                <TextInput style={styles.searchInput}/>
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
                        <Text style={styles.tabText}>Gaming{"\n"}{'& Collectibles'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>this.select(3)} style={ this.state.tabSelected === 3 ?
                     [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] :
                     styles.tab}>
                        <Text style={styles.tabText}>Marketplaces</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.tabContent}>
                        {/* {this.state.isLoading && <ActivityIndicator size="large" color="white"/>} */}
                        
                        <ScrollView style={{ paddingBottom: 20 }}>
                        <View>
                        {this.state.filteredAuthList.map((item, i) => {
                            return (
                                <View style={styles.item} key={i}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{ width: 45, height: 45, alignItems: 'center', borderRadius: 50, backgroundColor: 'white'}}>
                                            <Image style={{ width: 40, height: 50 }} resizeMode="contain" source={{uri: item.icon_url}}/>
                                        </View>
                                        <View style={styles.content}>
                                            <Text style={styles.name}>{item.name + ': ' + '$' + item.amount}</Text>  
                                            <Text style={styles.date}>{item.description}</Text>                                  
                                        </View>
                                    </View>
                                    <View style={styles.view}>
                                        <TouchableOpacity onPress={() => this.selectItem(item)} style={{ marginRight: 30,}}>
                                            <Text style={{ color: 'white', fontSize: 15, }}>View{'\n'}Offer</Text>
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
    logoContainer: {
        //alignItems: 'flex-start',
        borderColor: 'white',
        width: 40,
        height: 40,
        alignSelf: 'flex-start',
        justifyContent: 'center',
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
        marginTop: 10,
        paddingBottom: 10,
        alignItems: 'center'
    },
    tabHeader: {
        paddingHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'rgba(255,255,255,0.6)',
    },
    tab: {
        flex: 1,
        paddingBottom: 10,
        //paddingHorizontal: 20,
        alignSelf: 'flex-end'
    },
    tabText: {
        color: 'white',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 14,
    },
    tabContent: {
        paddingVertical: 20,
        marginBottom: 20,
    },
    item: {
        //flex: 1,
        marginHorizontal: 10,
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 8,
        backgroundColor: '#2EA2E1',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 10,
    },
    content: {
        marginLeft: 15,
        alignSelf: 'center'
    },
    name: {
        fontSize: 16,
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

export default connect(mapStateToProps)(OffersScreen);

