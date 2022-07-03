import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  myBooksRequest: null,
  myBooksSuccess: ['payload'],
  myBooksFailure: null,
  myBooksDone: null,

  downloadTracks: ['book'],

  updateBook: ['book'],
  myBooksReset: null,

  myBooksDelete: ['book'],
  myBooksRestore: null,
});

export const MyBooksTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: null,
  payload: null,
  error: null,
  book: null,
});

/* ------------- Reducers ------------- */

// request the username from an api
export const request = (state) =>
  state.merge({ fetching: true, book: null });

// successful api lookup
export const success = (state, { payload }) =>
  state.merge({ fetching: false, error: null, payload });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, book: null });

export const reset = () => INITIAL_STATE;

export const done = (state) =>
  state.merge({ fetching: false, error: null });

const updateBook = (state, { book }) => {
  const payload = state.payload ? state.payload.asMutable({ deep: true }) : [];
  const index = payload.findIndex((b) => (b.cod === book.cod));
  if (index !== -1) {
    payload[index] = book;
  } else {
    payload.push(book);
  }
  return state.merge({ payload, fetching: false, error: false, book });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MY_BOOKS_REQUEST]: request,
  [Types.MY_BOOKS_SUCCESS]: success,
  [Types.MY_BOOKS_FAILURE]: failure,
  [Types.MY_BOOKS_DONE]: done,

  [Types.DOWNLOAD_TRACKS]: request,

  [Types.UPDATE_BOOK]: updateBook,

  [Types.MY_BOOKS_RESET]: reset,

  [Types.MY_BOOKS_DELETE]: request,
  [Types.MY_BOOKS_RESTORE]: request,
});
