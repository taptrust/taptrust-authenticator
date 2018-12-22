import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { DrawerActions, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import Activity from '../Activity';
const { width, height } = Dimensions.get('window');

class ActivityList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    console.log('ActivityList Data', this.props.data);
  }


  render() {
    if (this.props.data === false){ return (null); }
    let activityListInner;
    console.log('data -> ' + this.props.data);
    if (this.props.data.length > 0) {
      activityListInner = (
        <ScrollView style={{flex: 1}}>
        
                  {this.props.data.map((item, i) => {
                    return (
                        <Activity item={item} key={i} selectItem={this.props.selectItem}/>
                    )})
                  }
        </ScrollView>
    );
  } else {
      activityListInner = (
        <View>
      <Text style={{
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        alignContent: 'flex-end'
      }}>You do not have any account activity.</Text>
      </View>
      
  );
    }
    return (
      <View style={styles.tabContent}>
        {activityListInner}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
});

const mapStateToProps = (state) => ({
  nav: state.nav,
  isLoggedIn: state.auth.isLoggedIn,
  pubkey: state.auth.pubkey,
  userName: state.auth.userName,
});


export default withNavigation(connect(mapStateToProps)(ActivityList));
