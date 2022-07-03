import Immutable from 'seamless-immutable';
import { StartupTypes } from '../Redux/StartupRedux';
import Config from '../Config/DebugConfig';

const Reactotron = require('reactotron-react-native').default;
const errorPlugin = require('reactotron-react-native').trackGlobalErrors;
const apisaucePlugin = require('reactotron-apisauce');
const { reactotronRedux } = require('reactotron-redux');
const sagaPlugin = require('reactotron-redux-saga');

if (Config.useReactotron) {
  Reactotron.configure({
    // host: '10.0.3.2' // default is localhost (on android don't forget to `adb reverse tcp:9090 tcp:9090`)
    host: '192.168.1.57',
    // host: '192.168.0.4',
    name: 'Humanitas' // would you like to see your app's name?
  })
    .use(
      errorPlugin({
        veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0
      })
    )
    .use(apisaucePlugin())
    .use(
      reactotronRedux({
        isActionImportant: action => action.type === StartupTypes.STARTUP,
        // you can flag to exclude certain types too... especially the chatty ones
        // except: ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'],
        // Fires when Reactotron uploads a new copy of the state tree.  Since our reducers are
        // immutable with `seamless-immutable`, we ensure we convert to that format.
        onRestore: state => Immutable(state)
      })
    )
    .use(sagaPlugin())
    .connect();

  // Let's clear Reactotron on every time we load the app
  Reactotron.clear();

  // Totally hacky, but this allows you to not both importing reactotron-react-native
  // on every file.  This is just DEV mode, so no big deal.
  console.tron = Reactotron;
} else {
  // a mock version should you decide to leave console.tron in your codebase
  console.tron = {
    log: () => false,
    warn: () => false,
    error: () => false,
    display: () => false,
    image: () => false
  };
}

const yeOldeConsoleLog = console.log;

// make a new one
console.log = (...args) => {
  // always call the old one, because React Native does magic swizzling too
  yeOldeConsoleLog(...args);

  // send this off to Reactotron.
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null
  });
};
