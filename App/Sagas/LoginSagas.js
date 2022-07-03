import { put, call } from 'redux-saga/effects';
import { facebook } from 'react-native-simple-auth';
import I18n from 'react-native-i18n';
import LoginActions from '../Redux/LoginRedux';
import BooksActions from '../Redux/BooksRedux';
import MyBooksActions from '../Redux/MyBooksRedux';
import ProfileActions from '../Redux/ProfileRedux';
import AlertActions from '../Redux/AlertRedux';
// import User from '../Transforms/User';

export function* register(api, { username, password }) {
  const response = yield call(api.registerUser, username, password);
  if (response.ok) {
    yield [
      put(LoginActions.loginSuccess(response.data, response.data.access_token)),
      put(MyBooksActions.myBooksRequest()),
      put(BooksActions.booksRequest()),
      put(ProfileActions.profileRequest()),
      put(AlertActions.alertSet('info', 'Register', I18n.t('registerSuccess')))
    ];
  } else {
    __DEV__ && console.log(response.data);
    const { error } = response.data;
    yield [
      put(LoginActions.loginFailure(error)),
      put(AlertActions.alertSet('error', 'Error', I18n.t(error))),
    ];
  }
}

// attempts to login
export function* login(api, { username, password }) {
  const response = yield call(api.loginUser, username, password);
  if (response.ok) {
    yield [
      put(LoginActions.loginSuccess(response.data, response.data.access_token)),
      put(MyBooksActions.myBooksRequest()),
      put(BooksActions.booksRequest()),
      put(ProfileActions.profileRequest()),
      put(AlertActions.alertSet('info', 'Login', I18n.t('loginSuccess')))
    ];
  } else {
    __DEV__ && console.log('error response', response.data);
    const { error } = response.data;
    yield [
      put(LoginActions.loginFailure(response.data)),
      put(AlertActions.alertSet('error', 'Error', I18n.t(error)))
    ];
  }
}

export function* logout() {
  yield [
    put(MyBooksActions.myBooksReset()),
    put(ProfileActions.profileReset()),
    put(BooksActions.booksRequest()),
    put(AlertActions.alertSet('info', 'Exit', I18n.t('logoutSuccess')))
  ];
}

export function* oAuth({ authType }) {
  const response = yield call(facebookApi);
  if (response.user.error) {
    __DEV__ && console.log('error response', response.user.error);
    const error = response.user.error.type;
    yield [
      put(LoginActions.oauthFailure(error)),
      put(AlertActions.alertSet('error', 'Error', I18n.t(error)))
    ];
  } else {
    const user = response.user;
    yield [
      put(LoginActions.oauthSuccess(user, response.credentials.access_token)),
      put(LoginActions.sendRequest(user)),
      put(MyBooksActions.myBooksRequest()),
      put(ProfileActions.profileRequest()),
      put(AlertActions.alertSet('info', 'Login', I18n.t('loginSuccess')))
    ];
  }
}

export function* sendUser(api, { person }) {
  const response = yield call(api.sendUser, person);
  if (response.ok) {
    yield put(AlertActions.alertSet('info', '', I18n.t('userProvisioned')));
  } else {
    __DEV__ && console.log('error response', response.data);
    const { error } = response.data;
    yield [
      put(AlertActions.alertSet('error', 'Error', I18n.t(error))),
      put(LoginActions.loginFailure(response))
    ];
  }
}

export function* recover(api, { username }) {
  const response = yield call(api.recoverPassword, username);
  if (response.ok) {
    yield put(AlertActions.alertSet('info', '', I18n.t('checkYourMail')));
  } else {
    __DEV__ && console.log('error response', response.data);
    const { error } = response.data;
    yield [
      put(LoginActions.loginFailure(response)),
      put(AlertActions.alertSet('error', 'Error', I18n.t(error)))
    ];
  }
}

function facebookApi() {
  return facebook({ appId: '227631244307907', callback: 'fb227631244307907://authorize' })
    .then(response => response)
    .catch(error => error);
}
