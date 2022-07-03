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
import LoginActions, { isLoggedIn } from '../Redux/LoginRedux';
import AlertActions from '../Redux/AlertRedux';
// import RoundedButton from '../Components/RoundedButton';
import Link from '../Components/Link';

class RegisterScreen extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      // username: __DEV__ ? 'vali@appcenter.ro' : null,
      // password: __DEV__ ? 'cacapipi' : null,
      // confirm: __DEV__ ? 'cacapipi' : null,
      username: null,
      password: null,
      confirm: null,
      accept: false,
    };
    this.isAttempting = false;
  }

  componentWillReceiveProps(newProps) {
    if (this.isAttempting && !newProps.fetching && newProps.isLoggedIn && !newProps.isError) {
      this.context.goBack();
    }
  }

  isAttempting = false;

  handlePr = () => {
    if (!this.state.accept) {
      return this.warning();
    }
    if (!this.props.online) {
      return this.props.alert('error', 'Rețea', I18n.t('offline'));
    }
    const { username, password, confirm } = this.state;
    if (password !== confirm) {
      this.props.alert('error', 'Error', I18n.t('passwordMismatch'));
    } else {
      this.isAttempting = true;
      this.props.attemptRegister(username, password);
    }
  };

  handlePressFacebook = () => {
    if (!this.state.accept) {
      return this.warning();
    }
    this.props.facebookLogin();
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text });
  }

  handleChangePassword = (text) => {
    this.setState({ password: text });
  }

  handleChangeConfirm = (text) => {
    this.setState({ confirm: text });
  }

  warning = () => {
    this.props.alert('error', 'Error', I18n.t('agree_with_terms'));
  };  

  render() {
    const { username, password, confirm } = this.state;
    // const { fetching } = this.props;
    return (
      <View style={[styles.mainContainer]}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ flex: 1, justifyContent: 'flex-start' }}
        >
          <View style={{ alignItems: 'flex-end', marginTop: 0 }}>
            <Icon.Button
              name="times-circle"
              size={20}
              color={Colors.coal}
              backgroundColor={Colors.transparent}
              onPress={() => this.context.goBack()}
            />
          </View>
          <Image source={Images.topLogo} style={styles.topLogo} />
          <View style={styles.form}>
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
                  returnKeyType='next'
                  secureTextEntry
                  onChangeText={this.handleChangePassword}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={() => this.refs.confirm.focus()}
              />
            </View>

            <View style={styles.row}>
              <Sae
                  label={I18n.t('confirmPassword')}
                  style={styles.wrapperStyle}
                  inputStyle={styles.inputStyle}
                  labelStyle={styles.labelStyle}
                  iconClass={Icon}
                  iconName={'key'}
                  iconColor={Colors.orange}
                  autoCapitalize='none'
                  autoCorrect={false}
                  ref='confirm'
                  value={confirm}
                  keyboardType='default'
                  returnKeyType='go'
                  secureTextEntry
                  onChangeText={this.handleChangeConfirm}
                  underlineColorAndroid='transparent'
                  onSubmitEditing={this.handlePressRegister}
              />
            </View>

            <View style={[styles.loginRow, { marginBottom: 15 }]}>
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
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }} >{I18n.t('tandc')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginBottom: 20 }} />            
              <Icon.Button
                // disabled={!this.state.accept}
                name="user"
                style={styles.button}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={this.handlePr}
              >
                <Text style={styles.fbText}>{I18n.t('register')}</Text>
              </Icon.Button>
              <View style={{ marginBottom: 20 }} />

              <Icon.Button
                // disabled={!this.state.accept}
                name="facebook-square"
                style={styles.facebook}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={this.handlePressFacebook}
              >
                <Text style={styles.fbText}>{I18n.t('fb_login')}</Text>
              </Icon.Button>
            </View>
            <Link
              style={[styles.link, { marginTop: -20 }]}
              text={I18n.t('haveAccount')}
              textStyle={styles.linkText}
              onPress={() => this.context.goBack()}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }

}

RegisterScreen.contextTypes = {
  goTo: PropTypes.func,
  goBack: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isError: state.login.error !== null,
  fetching: state.login.fetching,
  isLoggedIn: isLoggedIn(state.login),
  online: state.startup.online,
});

const mapDispatchToProps = (dispatch) => ({
  attemptRegister: (username, password) =>
    dispatch(LoginActions.registerRequest(username, password)),
  alert: (kind, title, message) => dispatch(AlertActions.alertSet(kind, title, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
