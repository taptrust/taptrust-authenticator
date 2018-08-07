/**
 * Created by ihor_kucherenko on 6/28/17.
 */

import React, {Component} from "react";
import {BackHandler, Dimensions, FlatList, Text, TouchableOpacity, View} from "react-native";
import {Button, Container, Spinner, StyleProvider, Tabs} from "native-base";
import RepositoryListItem from "./RepositoryListItem";
import colors from "../resources/colors";
import material from "../native_theme/variables/material";
import {connect} from "react-redux";
import strings from "../resources/strings";
import getTheme from "../native_theme/components";
import styles from "../resources/styles";
import consts from "../const";
import dimens from "../resources/dimens";
import PopupDialog, {DialogTitle, ScaleAnimation} from "react-native-popup-dialog";
import * as Toast from "@remobile/react-native-toast/index";
import * as listActions from "../actions/list-actions";
import * as logoutActions from "../actions/logout-actions";

const {height, width} = Dimensions.get('window');
export class RepositoriesList extends Component {


  static navigationOptions = ({navigation, screenProps}) => {
    return {
      headerRight: (
        <TouchableOpacity onPress={() => {
          navigation.state.params.showDialog();
        }}>
          <Text style={repositoriesListStyles.logOutTextStyle}>{strings.logout}</Text>
        </TouchableOpacity>
      ),
      title: strings.list_title,
      headerLeft: null,
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white'
      },
      headerStyle: {
        backgroundColor: colors.primaryColor
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.popupDialog = {}
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({item}) => (
    <RepositoryListItem
      id={item.id}
      repository={item}
      title={item.full_name}
      description={item.description}
      navigation={this.props.navigation}
    />
  );

  componentDidUpdate() {
    const {list} = this.props;
    const {listError} = list;

    const {navigation, login} = this.props;
    const isLoggedIn = login.get('isLoggedIn');
    if (!isLoggedIn && !this.isGoneAlready) {
      navigation.navigate(consts.LOGIN_SCREEN);
      this.isGoneAlready = true;
    }

    if (listError && listError.message) {
      Toast.showShortBottom(this.props.login.get('loginError').message);
      this.props.dispatch(listActions.setError({}))
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      showDialog: this.showDialog.bind(this)
    });
    BackHandler.addEventListener(consts.HARDWARE_PRESS_EVENT, () => {
      BackHandler.exitApp();
    });
    this.props.dispatch(listActions.getList(this.props.login.get('token'), 1, consts.BASE_PAGE_LIMIT));
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container
          shouldRasterizeIOS
          renderToHardwareTextureAndroid
          style={repositoriesListStyles.screenStyle}>
          <Tabs >
            <FlatList
              style={repositoriesListStyles.flatListStyle}
              data={this.props.list.get('data')}
              heading={strings.tab_1}
              onEndReachedThreshold={0.01}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onEndReached={() => this.dispatchGetRepos() }
              ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
            />

            <FlatList
              style={repositoriesListStyles.flatListStyle}
              data={this.props.list.get('data')}
              heading={strings.tab_2}
              onEndReachedThreshold={0.01}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onEndReached={() => this.dispatchGetRepos()}
              ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
            />
            <FlatList
              style={repositoriesListStyles.flatListStyle}
              data={this.props.list.get('data')}
              heading={strings.tab_3}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onEndReachedThreshold={0.01}
              onEndReached={() => this.dispatchGetRepos()}
              ItemSeparatorComponent={() => <View style={repositoriesListStyles.itemSeparatorStyle}/>}
            />
          </Tabs>
          {this.renderProgress()}
          {this.renderLogOutDialog()}
        </Container>
      </StyleProvider>)
  }

  showDialog() {
    this.popupDialog.show();
  }

  renderLogOutDialog() {
    return (
      <PopupDialog
        width={width - dimens.margin_medium * 2}
        dialogStyle={{height: 150}}
        dialogAnimation={ new ScaleAnimation() }
        dialogTitle={<DialogTitle titleTextStyle={repositoriesListStyles.dialogTitleTextStyle} title={strings.logout}/>}
        ref={(popupDialog) => {
          this.popupDialog = popupDialog;
        }}>
        <View style={repositoriesListStyles.dialogContainerStyle}>
          <Text style={repositoriesListStyles.dialogDescriptionStyle}>{strings.logout_message}</Text>
          <View style={repositoriesListStyles.dialogButtonContainer}>
            <Button transparent onPress={() => {
              this.dispatchLogOut();
              this.popupDialog.dismiss();
            }}><Text style={repositoriesListStyles.dialogButtonTextStyle}>{strings.ok}</Text></Button>
            <Button transparent onPress={() => {
              this.popupDialog.dismiss()
            }}><Text style={repositoriesListStyles.dialogButtonTextStyle}>{strings.cancel}</Text></Button>
          </View>
        </View>
      </PopupDialog>);
  }

  dispatchLogOut() {
    this.props.dispatch(logoutActions.logout(
      this.props.login.get('authorizationId'),
      this.props.login.get('username'),
      this.props.login.get('password'))
    )
  }

  renderProgress() {
    if (this.props.root.get('progress')) {
      return ( <Spinner
        color={colors.accentColor}
        animating={true}
        size={'large'}
        style={styles.progressStyle}/>)
    } else {
      return null;
    }
  }

  dispatchGetRepos() {
    this.props.dispatch(listActions.getList(
      this.props.login.get('token'),
      this.getNextPage(),
      consts.BASE_PAGE_LIMIT));
  }

  getNextPage() {
    return Math.ceil(this.props.list.get('data').length / consts.BASE_PAGE_LIMIT) + 1
  }

}

const repositoriesListStyles = {
  flatListStyle: {},
  screenStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor
  },
  itemSeparatorStyle: {
    flex: 1,
    height: 1,
    backgroundColor: 'grey',
  },
  logOutTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 16
  },
  dialogDescriptionStyle: {
    flexGrow: 1,
    fontSize: 16
  },
  dialogButtonContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end'
  },
  dialogButtonTextStyle: {
    color: colors.accentColor,
    fontSize: 20
  },
  dialogContainerStyle: {
    flexGrow: 1,
    alignItems: 'center'
  },
  dialogTitleTextStyle: {
    fontSize: 20,
    color: 'black'
  }
};

function mapStateToProps(state) {
  return {
    login: state.get('login'),
    list: state.get('list'),
    root: state.get('root'),
  }
}
export default connect(mapStateToProps)(RepositoriesList)