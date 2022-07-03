import { call, put, select } from 'redux-saga/effects';
// import { Platform } from 'react-native';
import I18n from 'react-native-i18n';
import MyBooksActions from '../Redux/MyBooksRedux';
import AlertActions from '../Redux/AlertRedux';
import { myBooksTransform } from '../Transforms';

const selectUser = (state) => state.login.user;
const selectBooks = (state) => state.myBooks.payload;

const pad = (a, b) => (1e15 + a + '').slice(-b);

const STATIC_AUDIO = 'https://example.com/humanitas/audio/';

export function* getMyBooks(api) {
  const user = yield select(selectUser);
  const response = yield call(api.getMyBooks, user.id);
  if (response.ok) {
    const payload = yield select(selectBooks);
    yield put(MyBooksActions.myBooksSuccess(myBooksTransform(response.data, payload)));
  } else {
    yield put(MyBooksActions.myBooksFailure());
  }
}

export function* downloadTracks(api, { book }) {
  yield put(AlertActions.alertSet('info', 'INFO', `${book.titlu} ${I18n.t('downloadingTracks')}`));

  const b = { ...book };
  if (!b.tracks) {
    b.tracks = [...Array(b.trackuri)].map((_, k) => ({
      track: k + 1,
      paused: true,
      duration: null,
      currentTime: null,
      file: `${pad(k + 1, 3)}_${b.fisier}.mp3`,
    }));
  }
  const responses = yield [
    ...b.tracks.map(t => call(api.downloadAudio, t.file.replace(STATIC_AUDIO, '')))
  ];
  b.tracks.map((t, i) => (t.local = responses[i].path()));
  yield put(MyBooksActions.updateBook(b));
  yield put(AlertActions.alertSet('info', 'Success', `${b.titlu} ${I18n.t('downloadComplete')}`));
}

// export function* downloadMyBooks(api, { reload }) {
//   const user = yield select(selectUser);
//   const books = yield select(selectBooks);
//   const response = yield call(api.getMyBooks, user.id);
//   // success?
//   if (response.ok) {
//     const payload = response.data;
//     for (let i = 0; i < payload.length; i++) {
//       const b = payload[i];
//       const found = books ? books.filter((x) => (x.cod === b.cod && x.status === 'done')) : [];
//       if (found.length === 0 || b.cod === reload) {
//         b.status = 'downloading';
//         if (b.tip === 'epub') {
//           b.local = yield call(api.downloadEpub, b.fisier);
//         } else if (b.tip === 'audio') {
//           if (!b.tracks) {
//             b.tracks = [...Array(b.trackuri)].map((_, k) => ({
//               track: k + 1,
//               paused: true,
//               duration: null,
//               currentTime: null,
//               file: `${pad(k + 1, 3)}_${b.fisier}.mp3`,
//             }));
//           }
//           for (let j = 0; j < b.tracks.length; j++) {
//             const t = b.tracks[j];
//             if (!t.local) {
//               const file = t.file.replace(STATIC_AUDIO, '');
//               const res = yield call(api.downloadAudio, file);
//               t.local = res.path();
//               t.file = `${STATIC_AUDIO}${file}`;
//               yield put(MyBooksActions.myBooksProgress(j / b.tracks.length, b.titlu));
//             }
//           }
//         }
//         yield put(MyBooksActions.myBooksProgress(100));
//         yield put(AlertActions.alertSet('info', 'Success', `${b.titlu} ${I18n.t('downloadComplete')}`));
//       } else if (b.tip === 'epub') {
//         b.local = found[0].local;
//       } else {
//         b.tracks = found[0].tracks;
//       }
//       b.status = 'done';
//       yield put(MyBooksActions.myBooksSuccess(b));
//       yield put(MyBooksActions.myBooksProgress(0));
//     }
//   } else {
//     yield put(MyBooksActions.myBooksFailure());
//   }
// }

export function* deleteBook(api, { book }) {
  const user = yield select(selectUser);
  const response = yield call(api.deleteBook, book, user.id);
  if (response.ok) {
    yield put(MyBooksActions.myBooksSuccess(response.data));
  } else {
    yield put(MyBooksActions.myBooksFailure());
  }
}

export function* restoreBooks(api) {
  const user = yield select(selectUser);
  const response = yield call(api.restoreBooks, user.id);
  if (response.ok) {
    yield put(MyBooksActions.myBooksSuccess(response.data));
  } else {
    yield put(MyBooksActions.myBooksFailure());
  }
}
