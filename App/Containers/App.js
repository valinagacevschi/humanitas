import React, { Component } from 'react';
import { Provider } from 'react-redux';
// import codePush from 'react-native-code-push';
import '../Config';
import RootContainer from './RootContainer';
import createStore from '../Redux';
// create our store
const store = createStore();

// const codePushOptions = {
//   updateDialog: true,
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.IMMEDIATE,
// };

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

// export default codePush(codePushOptions)(App);
