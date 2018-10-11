
import { Platform, PushNotificationIOS, AsyncStorage } from "react-native";
import { store } from "../../config/store";
import { sha256, sha224 } from 'js-sha256';
const wallet=require('../../libraries/EthereumLib/ethereumjs-wallet');

let phasePrefix = 'taptrust-wallet-';

const generatePhase = (username, password) => {
    return phasePrefix + username + '-' + password;
}
const generateKeys = (username, password) => {
    let phase = generatePhase(username, password);
    let token = sha256(phase);
    const w = wallet.generate(false, token);
    let private_key = w.getPrivateKeyString();
    let public_key = w.getPublicKeyString();
    let result = {
        public_key: public_key,
        private_key: private_key,
    }
    return result;
};

export {
    generateKeys
};
