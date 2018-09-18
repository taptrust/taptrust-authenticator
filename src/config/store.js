import { createStore, applyMiddleware, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

import reducers from '../redux/reducers';

const rootNavigationMiddleware = createReactNavigationReduxMiddleware(
    "nav",
    state => state.nav,
);

const middleware = [];

middleware.push(rootNavigationMiddleware);

const reducer = combineReducers(reducers);

const store = createStore(reducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

export {
    store,
    persistor,
};
