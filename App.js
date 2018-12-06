import './global';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { store, persistor } from "./src/config/store";
import SplashScreen from './src/screens/Splash';
import Root from './src/Root';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <PersistGate persistor={persistor}>
                        <Root />
                    </PersistGate>
                </View>
            </Provider>
        );
    }
}

export default App;
