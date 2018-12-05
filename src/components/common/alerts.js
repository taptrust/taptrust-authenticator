import {
  Alert
} from 'react-native';


const notReadyAlert = (alertTitle) => {
    return Alert.alert(
    alertTitle,
    'This feature is not currently available.',
    [
    {text: 'OK', onPress: () => console.log('User clicked OK for notReadyAlert: ' + alertTitle)},
    ],
    { cancelable: false }
  );
}


export {
    notReadyAlert
};
