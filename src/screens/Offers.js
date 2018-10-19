import React, { Component } from 'react'
import {
  StyleSheet, Text, View, Image,
  TouchableWithoutFeedback,
  Keyboard, TouchableOpacity,
  Dimensions, ActivityIndicator, ScrollView
} from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';

import OffersList from '../components/OffersList';
import Header from '../components/Header';

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
  {
    icon_url: 'http://www.taptrust.com/static/img/twitter@2x.png',
    name: 'Great dApp',
    amount: '99',
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
  {
    icon_url: 'http://www.taptrust.com/static/img/twitter@2x.png',
    name: 'Great dApp',
    amount: '99',
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
      tabSelected: 1,
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

  render() {
    return (
      <LinearGradient  colors={['#0499ED', '#0782c6', '#1170a3']} style={styles.container}>
        <Header left="nav" title="Offers" right={true}/>
        <View style={styles.searchBar}>
          <Ionicons style={{ alignSelf: 'center',}} name="ios-search" size={25} color="black"/>
          <TextInput style={styles.searchInput}/>
        </View>
        <View style={styles.tabView}>
          <View style={styles.tabHeader}>
            <TouchableOpacity onPress={() => this.select(1)} style={ this.state.tabSelected === 1 ?
            [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab
            }>
              <Text style={styles.tabText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.select(2)} style={ this.state.tabSelected === 2 ?
            [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab
            }>
              <Text style={styles.tabText}>Gaming{"\n"}{'& Collectibles'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>this.select(3)} style={ this.state.tabSelected === 3 ?
            [styles.tab, {borderBottomColor: 'white', borderBottomWidth: 3}] : styles.tab}>
              <Text style={styles.tabText}>Marketplaces</Text>
            </TouchableOpacity>
          </View>
          <OffersList data={this.state.filteredAuthList}/>
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
    flex: 1,
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

