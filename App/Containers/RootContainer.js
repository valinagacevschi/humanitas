import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StatusBar,
  AppState,
  BackHandler,
  Platform,
  NetInfo
} from 'react-native';
import { connect } from 'react-redux';
import { ThemeProvider } from 'react-native-material-ui';
import I18n from 'react-native-i18n';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';
import AppNavigator from '../Navigation/AppNavigator';
import Spinner from '../Components/Spinner';
import NavActions from '../Redux/NavRedux';
import StartupActions from '../Redux/StartupRedux';
import AlertActions from '../Redux/AlertRedux';
import ReduxPersist from '../Config/ReduxPersist';
import DropdownAlert from '../Components/DropdownAlert';
// Styles
import styles from './Styles/RootContainerStyles';
import { Colors } from '../Themes';
import uiTheme from './Styles/uiTheme';

const tracker = new GoogleAnalyticsTracker('UA-110547678-1');

class RootContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { backPress: false };
    this.navigator = null;
  }

  getChildContext() {
    return {
      goTo: this.goTo,
      goBack: this.goBack,
      reset: this.reset
    };
  }

  componentDidMount() {
    if (!ReduxPersist.active) {
      this.props.startup();
    }
    if (Platform.OS === 'android') SplashScreen.hide();

    AppState.addEventListener('change', this.handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    NetInfo.isConnected.addEventListener('change', this.handleConnectivityChange);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.alert) {
      const { kind, title, message } = newProps.alert;
      if (kind && title && message) {
        this.dropdown.alertWithType(kind, title, message);
        this.props.clear();
      }
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    NetInfo.isConnected.removeEventListener('change', this.handleConnectivityChange);
  }

  onNavigationChange = (prevState, newState, action) => {
    if (action.type === 'Navigation/NAVIGATE') {
      const { routeName, params } = action;
      this.props.route(routeName, params);

      const path = this.path(routeName, params);
      __DEV__ && console.log('trackRoute', path);
      tracker.trackScreenView(path);
      tracker.trackEvent(Platform.OS, path);
    }
  }

  path = (routeName, params) => {
    switch (routeName) { 
      case 'book':
      case 'category': 
      case 'player':
        return `${routeName}/${params.title}`;
      case 'reader':
        return `${routeName}/${params.book.titlu}`;
      case 'payu':
        return `${routeName}/${params.command.count}`;
      default:
        return routeName;
    } 
  }

  goBack = () => {
    if (this.navigator) {
      this.navigator.dispatch(NavigationActions.back());
    }
  }

  goTo = (routeName, params = null) => {
    if (this.navigator) {
      this.navigator.dispatch(NavigationActions.navigate({ routeName, params }));
    }
  }

  reset = (routeName, params = null) => {
    if (this.navigator) {
      this.navigator.dispatch(
        NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName, params })]
        })
      );
    }
  }

  handleAppStateChange = appState => {
    if (appState === 'active') {
      // } else {
      //   PushNotification.setApplicationIconBadgeNumber(0);
    }
  };

  handleBackPress = () => {
    if (!this.state.backPress) {
      const that = this;
      this.dropdown.alertWithType('info', 'Exit', I18n.t('doubleBack'));
      this.setState({ backPress: true });
      setTimeout(() => {
        that.setState({ backPress: false });
      }, 2500);
    } else {
      return false;
    }
    return true;
  };

  handleConnectivityChange = (connectionInfo) => {
    this.props.net(connectionInfo);
  };

  render() {
    if (!this.props.rehidrated) return <Spinner />;
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.applicationView}>
        <StatusBar 
          animated
          barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} 
          backgroundColor={Colors.primary}
        />
          <AppNavigator 
            ref={nav => (this.navigator = nav)} 
            onNavigationStateChange={this.onNavigationChange} 
          />
          <DropdownAlert ref={ref => (this.dropdown = ref)} />
        </View>
      </ThemeProvider>
    );
  }
}

RootContainer.childContextTypes = {
  goTo: PropTypes.func,
  goBack: PropTypes.func,
  reset: PropTypes.func
};

const mapStateToProps = state => ({
  rehidrated: state.startup.rehidrated,
  alert: state.alert,
});

const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
  net: (online) => dispatch(StartupActions.net(online)),
  clear: () => dispatch(AlertActions.alertClear()),
  route: (routeName, params) => dispatch(NavActions.navRoute(routeName, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
