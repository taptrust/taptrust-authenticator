import { NavigationActions } from 'react-navigation';
import RootNavigator from '../../config/routes/RootNavigator';

const initialState = RootNavigator.router.getStateForAction(NavigationActions.init());


export default (state = initialState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);

    return nextState || state;
};

