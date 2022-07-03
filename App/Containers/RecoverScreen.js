import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Sae } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome';
import I18n from 'react-native-i18n';
import LoginActions from '../Redux/LoginRedux';
// import RoundedButton from '../Components/RoundedButton';
import Link from '../Components/Link';

import styles from './Styles/LoginScreenStyles';
import { Images, Colors } from '../Themes';

class RecoverScreen extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptRecover: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      // username: __DEV__ ? 'vali@experiment.ro' : null, //'reactnative@infinite.red',
      username: null,
    };
    this.isAttempting = false;
  }

  componentWillReceiveProps(newProps) {
    if (this.isAttempting && !newProps.fetching && newProps.noError) {
      this.context.goBack();
    }
  }

  isAttempting = false;

  handlePressRecover = () => {
    this.isAttempting = true;
    this.props.attemptRecover(this.state.username);
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text });
  }

  render() {
    const { username } = this.state;
    return (
      <View style={styles.mainContainer}>
        {/*<Image source={Images.topBgr} resizeMode="cover" style={styles.topBgr} />
        <Image source={Images.decoration} resizeMode="cover" style={styles.decoration} />*/}
        <KeyboardAwareScrollView
            contentContainerStyle={{ justifyContent: 'center' }}
            style={styles.container}
        >
          <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
            <Icon.Button
              name="times-circle"
              size={20}
              color={Colors.coal}
              backgroundColor={Colors.transparent}
              onPress={() => this.context.goBack()}
            />
          </View>
          <Image source={Images.topLogo} style={styles.topLogo} />
          <View style={{ marginTop: 80 }} />
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
                returnKeyType='go'
                onChangeText={this.handleChangeUsername}
                onSubmitEditing={() => this.handlePressRecover()}
            />
            </View>

            <View style={[styles.loginRow]}>
              <Icon.Button
                name="envelope"
                style={styles.button}
                backgroundColor={Colors.transparent}
                borderRadius={40}
                onPress={() => this.handlePressRecover()}
              >
                <Text style={styles.fbText}>{I18n.t('recoverPassword')}</Text>
              </Icon.Button>

              <Link
                text={I18n.t('rememberPassword')}
                style={styles.link}
                textStyle={styles.linkText}
                onPress={() => this.context.goBack()}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

RecoverScreen.contextTypes = {
  goBack: PropTypes.func,
  // reset: PropTypes.func,
};

const mapStateToProps = (state) => ({
  noError: state.login.error === null,
  fetching: state.login.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  attemptRecover: (username) => dispatch(LoginActions.recoverRequest(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverScreen);
