import { call, put, select } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import CommandActions from '../Redux/CommandRedux';
import MyBooksActions from '../Redux/MyBooksRedux';
import AlertActions from '../Redux/AlertRedux';

const selectUser = (state) => state.login.user;
const selectCommand = (state) => state.command;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const DELAY = 10000;

export function* getCommand(api, action) {
  const { data } = action;
  const response = yield call(api.getCommand, data);

  if (response.ok) {
    yield put(CommandActions.commandSuccess(response.data));
  } else {
    yield put(CommandActions.commandFailure());
  }
}

export function* saveCommand(api) {
  const command = yield select(selectCommand);
  const user = yield select(selectUser);
  const response = yield call(api.saveCommand, command, user.id);

  if (response.ok) {
    yield put(CommandActions.commandOrder(response.data.orderNo));
  } else {
    yield put(CommandActions.commandFailure());
  }
}

export function* resetCommand() {
  yield delay(DELAY);
  yield put(MyBooksActions.myBooksRequest());
  // yield put(MyBooksActions.downloadMyBooks());
  yield put(AlertActions.alertSet('info', 'INFO', I18n.t('myBookReload')));
}
