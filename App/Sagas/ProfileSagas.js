import { call, put, select } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import ProfileActions from '../Redux/ProfileRedux';
import AlertActions from '../Redux/AlertRedux';

const selectUser = state => state.login.user;

export function* getProfile(api) {
  console.log('profile');
  const user = yield select(selectUser);
  // make the call to the api
  const response = yield call(api.getProfile, user.id);
  if (response.ok) {
    yield put(ProfileActions.profileSuccess(response.data));
  } else {
    console.log('error', response);
    yield put(ProfileActions.profileFailure());
  }
}

export function* saveProfile(api, { profile }) {
  const user = yield select(selectUser);
  // console.log('PROFILE', profile);
  const response = yield call(api.saveProfile, profile, user.id);

  if (response.ok) {
    yield [
      put(ProfileActions.profileSuccess(response.data)),
      put(AlertActions.alertSet('info', 'Profile', I18n.t('profileSaved')))
    ];
  } else {
    yield [
      put(ProfileActions.profileFailure()),
      put(AlertActions.alertSet('info', 'Profile', I18n.t('profileError')))
    ];
  }
}
