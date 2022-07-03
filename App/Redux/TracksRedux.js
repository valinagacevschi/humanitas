import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  tracksSet: ['id', 'current', 'currentTime'],
});

export const TracksTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  current: null,
  currentTime: null,
});

/* ------------- Reducers ------------- */

// successful api lookup
export const set = (state, { id, current, currentTime }) =>
  state.merge({ id, current, currentTime });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRACKS_SET]: set,
});
