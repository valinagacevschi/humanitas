import { call, put } from 'redux-saga/effects';
import BooksActions from '../Redux/BooksRedux';

export function* getShelves(api, action) {
  const { data } = action;
  const response = yield call(api.getShelves, data);
  if (response.ok) {
    yield put(BooksActions.booksSuccess(response.data.shelves, response.data.categories));
  } else {
    __DEV__ && console.log('error response', response);
    yield put(BooksActions.booksFailure());
  }
}

export function* getBooks(api, { params }) {
  // const { category, section } = params;
  const response = yield call(api.getBooks, params);
  if (response.ok) {
    yield put(BooksActions.booksList(response.data));
  } else {
    __DEV__ && console.log('error response', response);
    yield put(BooksActions.booksFailure());
  }
}

export function* getBook(api, { params }) {
  // const { category, section } = params;
  const response = yield call(api.getBook, params);
  if (response.ok) {
    yield put(BooksActions.bookFound(response.data));
  } else {
    __DEV__ && console.log('error response', response);
    yield put(BooksActions.booksFailure());
  }
}
