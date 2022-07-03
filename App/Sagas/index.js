import { takeLatest } from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux';
import { BannersTypes } from '../Redux/BannersRedux';
import { BooksTypes } from '../Redux/BooksRedux';
// import { GithubTypes } from '../Redux/GithubRedux';
import { LoginTypes } from '../Redux/LoginRedux';
import { CommandTypes } from '../Redux/CommandRedux';
import { MyBooksTypes } from '../Redux/MyBooksRedux';
import { ProfileTypes } from '../Redux/ProfileRedux';
import { SearchTypes } from '../Redux/SearchRedux';

/* ------------- Sagas ------------- */

import { startup, net } from './StartupSagas';
import { getBanners } from './BannersSagas';
import { getShelves, getBooks, getBook } from './BooksSagas';
import { login, logout, oAuth, sendUser, register, recover } from './LoginSagas';
import { getCommand, saveCommand, resetCommand } from './CommandSagas';
import { getMyBooks, deleteBook, restoreBooks, downloadTracks } from './MyBooksSagas';
import { getProfile, saveProfile } from './ProfileSagas';
import { search } from './SearchSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield [
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(StartupTypes.NET, net),

    takeLatest(LoginTypes.OAUTH_REQUEST, oAuth),
    takeLatest(LoginTypes.REGISTER_REQUEST, register, api),
    takeLatest(LoginTypes.RECOVER_REQUEST, recover, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT, logout),
    takeLatest(LoginTypes.SEND_REQUEST, sendUser, api),

    // some sagas receive extra parameters in addition to an action
    takeLatest(BannersTypes.BANNERS_REQUEST, getBanners, api),
    takeLatest(BooksTypes.BOOKS_REQUEST, getShelves, api),
    takeLatest(BooksTypes.BOOKS_LOAD, getBooks, api),
    takeLatest(BooksTypes.BOOK_LOAD, getBook, api),

    takeLatest(CommandTypes.COMMAND_REQUEST, getCommand, api),
    takeLatest(CommandTypes.COMMAND_SAVE, saveCommand, api),
    takeLatest(CommandTypes.COMMAND_RESET, resetCommand),

    takeLatest(MyBooksTypes.MY_BOOKS_REQUEST, getMyBooks, api),
    takeLatest(MyBooksTypes.MY_BOOKS_DELETE, deleteBook, api),
    takeLatest(MyBooksTypes.MY_BOOKS_RESTORE, restoreBooks, api),
    takeLatest(MyBooksTypes.DOWNLOAD_TRACKS, downloadTracks, api),

    takeLatest(ProfileTypes.PROFILE_REQUEST, getProfile, api),
    takeLatest(ProfileTypes.PROFILE_SAVE, saveProfile, api),

    takeLatest(SearchTypes.SEARCH, search, api)
  ];
}
