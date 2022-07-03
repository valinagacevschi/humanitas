import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bookmarksRequest: null,
  bookmarksSuccess: ['payload'],
  bookmarksFailure: null,
  bookmarkSave: ['data', 'cod'],
});

export const BookmarksTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  // data: null,
  fetching: null,
  payload: [],
  error: null
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: [] });

// successful api lookup
export const success = (state, action) => {
  const { payload } = action;
  return state.merge({ fetching: false, error: null, payload });
};

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: [] });

export const save = (state, { data, cod }) => {
  const payload = state.payload ? state.payload.asMutable({ deep: true }) : [];
  const index = payload.findIndex((b) => (b.cod === cod));
  if (index !== -1) {
    payload[index] = { ...data, cod };
  } else {
    payload.push({ ...data, cod });
  }
  return state.merge({ payload });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BOOKMARKS_REQUEST]: request,
  [Types.BOOKMARKS_SUCCESS]: success,
  [Types.BOOKMARKS_FAILURE]: failure,
  [Types.BOOKMARK_SAVE]: save,
});
