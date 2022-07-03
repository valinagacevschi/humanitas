import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, Switch, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Sae } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';

import styles from './Styles/LoginScreenStyles';
import { Images, Colors } from '../Themes';
import LoginActions from '../Redux/LoginRedux';
import AlertActions from '../Redux/AlertRedux';
import Link from '../Components/Link';

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      // username: __DEV__ ? 'vali@experiment.ro' : null,
      // password: __DEV__ ? 'cacapipi' : null,
      username: null,
      password: null,
      focus: false,
      accept: false,
    };
    this.isAttempting = false;
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.fetching && newProps.noError && newProps.isLoggedIn) {
      this.context.goBack();
    }
  }

  isAttempting = false;

  handlePressLogin = () => {
    if (!this.state.accept) {
      return this.warning();
    }
    if (!this.props.online) {
      return this.props.alert('error', 'Rețea', I18n.t('offline'));
    }
    const { username, password } = this.state;
    if (username && password) {
      this.isAttempting = true;
      this.props.attemptLogin(username, password);
    } else {
      this.props.alert('error', 'Error', I18n.t('incorrectInfo'));
    }
  };

  handlePressFacebook = () => {
    if (!this.state.accept) {
      return this.warning();
    }
    this.props.facebookLogin();
  }

  handleChangeUsername = text => {
    this.setState({ username: text });
  };

  handleChangePassword = text => {
    this.setState({ password: text });
  };

  warning = () => {
    this.props.alert('error', 'Error', I18n.t('agree_with_terms'));
  }

  render() {
    const { username, password } = this.state;
    // const { fetching } = this.props;
    return (
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1, justifyContent: 'flex-start' }}
        >
          <View style={{ alignItems: 'flex-end', marginTop: 0 }}>
            <Icon.Button
              name='times-circle'
              size={20}
              color={Colors.coal}
              backgroundColor={Colors.transparent}
              onPress={() => this.context.goBack()}
            />
          </View>
          <Image source={Images.topLogo} style={styles.topLogo} />
          <View style={[styles.form, { width: 320, alignSelf: 'center' }]}>
            <View style={styles.row}>
              <Sae
                label={I18n.t('email')}
                style={styles.wrapperStyle}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                iconClass={Icon}
                iconName={'envelope'}
                iconColor={Colors.orange}
                autoCapitalize='none'
                autoCorrect={false}
                ref='username'
                value={username}
                keyboardType='email-address'
                underlineColorAndroid='transparent'
                returnKeyType='next'
                onChangeText={this.handleChangeUsername}
                onSubmitEditing={() => this.refs.password.focus()}
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}
              />
            </View>

            <View style={styles.row}>
              <Sae
                label={I18n.t('password')}
                style={styles.wrapperStyle}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                iconClass={Icon}
                iconName={'key'}
                iconColor={Colors.orange}
                autoCapitalize='none'
                autoCorrect={false}
                ref='password'
                value={password}
                keyboardType='default'
                returnKeyType='go'
                secureTextEntry
                onChangeText={this.handleChangePassword}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressLogin}
                onFocus={() => this.setState({ focus: true })}
                onBlur={() => this.setState({ focus: false })}
              />
            </View>

            <View style={styles.loginRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <Switch
                  onValueChange={(value) => this.setState({ accept: value })}
                  value={this.state.accept}
                  thumbTintColor={Colors.snow}
                  tintColor={Colors.steel}
                  onTintColor={Colors.orange}
                />
                <Text style={{ fontSize: 12 }} > Sunt de acord cu </Text>
                <TouchableOpacity onPress={() => this.context.goTo('terms')}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold'}} >{I18n.t('tandc')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 20 }} />
              <Icon.Button
                // disabled={!this.state.accept}
                name='lock'
                style={styles.button}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={this.handlePressLogin}
              >
                <Text style={styles.fbText}>{I18n.t('login')}</Text>
              </Icon.Button>
              <View style={{ marginBottom: 20 }} />
              <Icon.Button
                // disabled={!this.state.accept}
                name='facebook-square'
                style={styles.facebook}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={this.handlePressFacebook}
              >
                <Text style={styles.fbText}>{I18n.t('fb_login')}</Text>
              </Icon.Button>
              <Link
                text={I18n.t('forgotPassword')}
                style={styles.link}
                textStyle={[styles.linkText, { paddingBottom: 0 }]}
                onPress={() => this.context.goTo('recover')}
              />
              <Link
                style={[styles.link]}
                text={I18n.t('dontHaveAccount')}
                textStyle={styles.linkText}
                onPress={() => this.context.goTo('register')}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

LoginScreen.contextTypes = {
  goTo: PropTypes.func,
  goBack: PropTypes.func
};

const mapStateToProps = state => ({
  noError: state.login.error === null,
  fetching: state.login.fetching,
  isLoggedIn: state.login.user !== null,
  online: state.startup.online,
});

const mapDispatchToProps = dispatch => ({
  attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
  facebookLogin: () => dispatch(LoginActions.oauthRequest('facebook')),
  alert: (kind, title, message) => dispatch(AlertActions.alertSet(kind, title, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
