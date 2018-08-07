/**
 * Created by saionara1 on 6/29/17.
 */

// @flow
import React from "react";
import {Text, TouchableHighlight, View} from "react-native";
import consts from "../const";


export default class RepositoryListItem extends React.PureComponent {

  _onPress = () => {
    const {navigate} = this.props.navigation;
    navigate(consts.REPOSITORY_DETAILS_SCREEN, {repository: this.props.repository})
  };

  render() {
    return (
      <TouchableHighlight onPress={this._onPress}>
        <View style={itemStyles.itemStyle} {...this.props}>
          <Text style={itemStyles.itemTitleStyle}>{this.props.title}</Text>
          <Text style={itemStyles.itemDescriptionStyle}>{this.props.description}</Text>
        </View>
      </TouchableHighlight>
    )
  }

}

const itemStyles = {
  itemStyle: {
    marginHorizontal: 4,
    borderColor: 'lightgrey',
    elevation: 4,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 120,
    backgroundColor: 'white'
  },
  itemTitleStyle: {
    color: 'black',
    fontSize: 20,
    padding: 10
  },
  itemDescriptionStyle: {
    color: 'darkgrey',
    fontSize: 17,
    paddingLeft: 10
  }
};