


// @flow
import React, {Component} from "react";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import Navigation from "./components/Navigation.js";
const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation/>
      </Provider>
    );
  }
}
