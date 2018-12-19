import auth from './auth';
import app from './app';
import rootNavigation from './rootNavigation';
import { toastReducer as toast } from 'react-native-redux-toast';


export default {
    auth,
    app,
    toast,
    nav: rootNavigation,
};

