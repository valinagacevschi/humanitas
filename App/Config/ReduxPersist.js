import { AsyncStorage } from 'react-native';
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '0.1',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: [
      'startup',
      'search',
      'alert',
      // 'banners',
      // 'bookmarks',
      // 'books',
      // 'command',
      // 'profile',
      // 'myBooks',
    ],
    // reducer keys that you do NOT want stored to persistence here
    // whitelist: [], Optionally, just specify the keys you DO want stored to
    // persistence. An empty array means 'don't store any reducers' -> infinitered/ignite#409
    transforms: [immutablePersistenceTransform]
  }
};

export default REDUX_PERSIST;
