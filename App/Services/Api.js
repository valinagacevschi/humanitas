// a library to wrap and simplify api calls
// import { Platform } from 'react-native';
import apisauce from 'apisauce';
import RNFetchBlob from 'react-native-fetch-blob';
// import { unzip } from 'react-native-zip-archive';

let ROOT = 'https://example.com/hum/app_books/';
if (__DEV__ && false) {
  ROOT = 'http://localhost:3000/hum/app_books/';
  // ROOT = 'http://192.168.0.4:3000/hum/app_books/';
}
// const STATIC_EPUB = 'https://example.com/humanitas/';
export const STATIC_AUDIO = 'https://example.com/humanitas/audio/';
// our "constructor"
const create = (baseURL = ROOT) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      secret: 'mysecret'
    },
    timeout: 20000
  });

  const registerUser = (username, password) => api.post('register', { username, password });
  const recoverPassword = username => api.post('recover', { username });

  const getBanners = () => api.get('banners');

  const loginUser = (username, password) => api.post('login', { username, password });
  const sendUser = params => api.post('user', params);

  const getSearch = params => api.get('search', params);
  const getShelves = () => api.get('');
  const getBooks = params => api.get('books', params);
  const getBook = params => api.get('book', params);

  const saveCommand = (params, uid) => api.post('save_command', params, { headers: { uid } });

  const getProfile = uid => api.get('profile', {}, { headers: { uid } });

  const saveProfile = (profile, uid) => api.post('profile', { profile }, { headers: { uid } });

  const getMyBooks = uid => api.get('my_books', {}, { headers: { uid } });

  const deleteBook = (book, uid) => api.post('delete_book', { book }, { headers: { uid } });

  const restoreBooks = uid => api.post('restore_books', {}, { headers: { uid } });

  // const downloadEpub = (file) => {
  //   const docDir = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
  //   const localDir = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
  //   const filename = `${docDir}/${file}`;
  //   __DEV__ && console.log('filename', filename);
  //   const filedir = file.replace('.epub', '');
  //   return new Promise((resolve, reject) =>
  //     RNFetchBlob
  //       .config({
  //         fileCache: true,
  //         path: filename,
  //       })
  //       .fetch('GET', `${STATIC_EPUB}${file}`, { })
  //       // .then((res) => res)
  //       .then((res) => {
  //         console.log('new path', res.path());
  //         resolve(
  //           unzip(res.path(), `${localDir}/www/${filedir}`)
  //             .then((path) => ({ file: res.path(), path })));
  //       })
  //       .catch((err) => {
  //         __DEV__ && console.log('ERROR', err);
  //         reject(err);
  //       })
  //   );
  // };

  const downloadAudio = filename =>
    RNFetchBlob.config({ fileCache: true, appendExt: 'mp3' }).fetch(
      'GET',
      `${STATIC_AUDIO}${filename}`,
      {}
    );

  return {
    getBanners,
    registerUser,
    recoverPassword,
    loginUser,
    sendUser,
    getSearch,
    getShelves,
    getBooks,
    getBook,
    saveCommand,
    getMyBooks,
    deleteBook,
    restoreBooks,
    getProfile,
    saveProfile,
    // downloadEpub,
    downloadAudio
  };
};

// let's return back our create method as the default.
export default {
  create
};
