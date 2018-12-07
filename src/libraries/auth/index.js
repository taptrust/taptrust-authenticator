
import { sha256, sha224 } from 'js-sha256';
var wallet = require('./eth-wallet');

let seedPrefix = 'taptrust-wallet-';
let minFactorValue = 1000;
let maxFactorValue = 5000;

const generateSeed = (username, password, randomFactor) => {
    return seedPrefix + username + '-' + password + '-' + randomFactor;
}

const getRandomFactor = () => {
  let value = Math.floor(Math.random() * (maxFactorValue - minFactorValue)) + minFactorValue;
  return value.toString();
}

function makeRangeIterator(start, end, step) {
    let nextIndex = start;
    let iterationCount = 0;

    const rangeIterator = {
       next: function() {
           let counter;
           if (nextIndex <= end) {
               counter = { value: nextIndex, done: false }
               nextIndex += step;
               iterationCount++;
               return counter;
           }
           return { value: iterationCount.toString(), done: true }
       }
    };
    return rangeIterator;
}

// function for creating new keypair from username/password credentials
const createKeyPair = (username, password) => {
  let randomFactor = getRandomFactor();
  return generateKeys(username, password, randomFactor);
}

const generateKeys = (username, password, randomFactor) => {
    let seed = generateSeed(username, password, randomFactor);
    let token = sha256(seed);
    const w = wallet.generate(false, token);
    let privateKey = w.getPrivateKeyString();
    let publicKey = w.getPublicKeyString();
    let result = {
        publicKey: publicKey,
        privateKey: privateKey,
        randomFactor: randomFactor
    }
    return result;
};

// function for restoring already generated keypair with a known public key
const restoreKeyPair = (username, password, pubKey) => {
  let iterator = makeRangeIterator(minFactorValue - 1, maxFactorValue, 1);
  let counter = iterator.next();
  while (!counter.done) {
     let result = generateKeys(username, password, counter.value);
     if (result.publicKey === pubKey){
       console.log('value: ' + counter.value);
       return result;
     }
     counter = iterator.next();
  }
  return { error: 'Keypair matching provided public key not found' };
}

export {
    createKeyPair, restoreKeyPair
};
