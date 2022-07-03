import { combineReducers } from 'redux';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';

import { reducer as startup } from './StartupRedux';
import { reducer as nav } from './NavRedux';
import { reducer as banners } from './BannersRedux';
import { reducer as books } from './BooksRedux';
import { reducer as login } from './LoginRedux';
import { reducer as command } from './CommandRedux';
import { reducer as myBooks } from './MyBooksRedux';
import { reducer as bookmarks } from './BookmarksRedux';
import { reducer as profile } from './ProfileRedux';
import { reducer as search } from './SearchRedux';
import { reducer as tracks } from './TracksRedux';
import { reducer as alert } from './AlertRedux';

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    startup,
    nav,
    banners,
    books,
    login,
    command,
    profile,
    myBooks,
    bookmarks,
    search,
    tracks,
    alert
  });

  return configureStore(rootReducer, rootSaga);
};
