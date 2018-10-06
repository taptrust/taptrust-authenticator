import { createSwitchNavigator } from 'react-navigation';

import Splash from '../../screens/Splash';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

export default createSwitchNavigator({
  Splash: Splash,
  App: MainNavigator,
  Auth: AuthNavigator,
}, {
    initialRouteName: 'Splash',
});
