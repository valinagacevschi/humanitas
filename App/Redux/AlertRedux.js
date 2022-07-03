import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  alertSet: ['kind', 'title', 'message'],
  alertClear: null,
});

export const AlertTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  kind: null,
  title: null,
  message: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const set = (state, { kind, title, message }) =>
  state.merge({ kind, title, message });

export const clear = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ALERT_SET]: set,
  [Types.ALERT_CLEAR]: clear,
});
