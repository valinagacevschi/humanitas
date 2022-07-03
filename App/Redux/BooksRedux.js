import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  booksRequest: ['data'],
  booksLoad: ['params', 'data'],
  bookLoad: ['params', 'data'],
  booksSuccess: ['shelves', 'categories'],
  booksList: ['books'],
  bookFound: ['theBook'],
  booksFailure: null
});

export const BooksTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  shelves: null,
  categories: null,
  books: null,
  bookId: null,
  theBook: null,
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) => state.merge({ fetching: true, ...data });

// successful api lookup
export const success = (state, { shelves, categories }) =>
  state.merge({ fetching: false, error: null, shelves, categories });

// successful api lookup
export const list = (state, { books }) =>
  state.merge({ fetching: false, error: null, books });

export const book = (state, { theBook }) =>
  state.merge({ fetching: false, error: null, theBook });

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true });

// export const load = (state, { data }) => {
//   state.merge({ fetching: true, data, shelves: null });
// };

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOOKS_REQUEST]: request,
  [Types.BOOKS_SUCCESS]: success,

  [Types.BOOKS_LOAD]: request,
  [Types.BOOKS_LIST]: list,

  [Types.BOOK_LOAD]: request,
  [Types.BOOK_FOUND]: book,

  [Types.BOOKS_FAILURE]: failure,
});
