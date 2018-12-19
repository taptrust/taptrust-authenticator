import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

// Initial state
const initialState = {
  isTxCompleted: false
};

// Reducer
const app = (state = initialState, action) => {
  console.log('app Reducer was called with action ', action);

    switch (action.type) {
        case 'TX_COMPLETED':
          console.log('Saving TX_COMPLETED ' + action.isTxCompleted);
          return {
              ...state,
              isTxCompleted: action.isTxCompleted
          }
        default:
          return state;
      }
}

const persistConfig = {
    key: 'app',
    storage,
};

export default persistReducer(persistConfig, app);