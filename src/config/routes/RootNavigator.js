import { createSwitchNavigator } from 'react-navigation';

import Splash from '../../screens/Splash';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import TestingReminderScreen from '../../screens/TestingReminder';

export default createSwitchNavigator({
  Splash: Splash,
  Reminder: TestingReminderScreen,
  App: MainNavigator,
  Auth: AuthNavigator,
}, {
    initialRouteName: 'Splash',
});
