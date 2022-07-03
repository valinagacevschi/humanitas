import { put, select } from 'redux-saga/effects';
import I18n from 'react-native-i18n';
// import { is } from 'ramda';
import BannersActions from '../Redux/BannersRedux';
import BooksActions from '../Redux/BooksRedux';
import MyBooksActions from '../Redux/MyBooksRedux';
import AlertActions from '../Redux/AlertRedux';

const selectUser = state => state.login.user;
const selectRehidrated = state => state.startup.rehidrated;

// process STARTUP actions
export function* startup() {
  // if (__DEV__ && console.tron) {
  //   console.tron.log({
  //     message: 'pass objects for better logging',
  //     someGeneratorFunction: selectUser
  //   });
  //   // fully customized!
  //   const subObject = { a: 1, b: [1, 2, 3], c: true };
  //   subObject.circularDependency = subObject; // osnap!
  //   console.tron.display({
  //     name: '🔥 IGNITE 🔥',
  //     preview: 'You should totally expand this',
  //     value: {
  //       '💃': 'Welcome to the future!',
  //       subObject,
  //       someInlineFunction: () => true,
  //       someGeneratorFunction: startup,
  //       someNormalFunction: selectUser
  //     }
  //   });
  // }
  yield [
    put(BannersActions.bannersRequest()),
    put(BooksActions.booksRequest())
  ];

  const user = yield select(selectUser);
  if (user) {
    yield put(MyBooksActions.myBooksRequest());
  }
}

export function* net({ online }) {
  const rehidrated = yield select(selectRehidrated);
  if (!rehidrated) return;
  if (online) {
    yield put(AlertActions.alertSet('info', 'Rețea', I18n.t('online')));
  } else {
    yield put(AlertActions.alertSet('error', 'Rețea', I18n.t('offline')));
  }
}
