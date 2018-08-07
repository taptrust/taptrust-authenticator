/**
 * 
 */
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import configureStore from "../store/configureStore.js";
import {StackNavigator} from "react-navigation";
import Login from "./Login";
import RepositoriesList from "./RepositoriesList";
import RepositoryDetails from "./RepositoryDetails";

const store = configureStore();
const Routes = {
  Login: {screen: Login},
  RepositoriesList: {screen: RepositoriesList},
  RepositoryDetails: {screen: RepositoryDetails}
};
const Navigator = StackNavigator(Routes, {
  headerMode: 'screen'
});

export class Navigation extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    );
  }

}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}
export default connect(
  mapStateToProps)(Navigation);
