import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerRequest: ['username', 'password'],
  recoverRequest: ['username'],
  loginRequest: ['username', 'password'],
  loginSuccess: ['user', 'access_token'],
  loginFailure: ['error'],

  oauthRequest: ['authType'],
  oauthSuccess: ['user', 'access_token'],
  oauthFailure: ['error'],
  sendRequest: ['person'],
  logout: null,
  firstTime: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  access_token: null,
  error: null,
  fetching: false,
  firstTime: true,
});

/* ------------- Reducers ------------- */
// we're attempting to login
export const request = (state) => state.merge({ fetching: true });
// export const orequest = (state) => state.merge({ fetching: false });

// we've successfully logged in
export const success = (state, { user, access_token }) =>
  state.merge({ fetching: false, error: null, user, access_token });

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error });

// we've logged out
export const logout = (state) => INITIAL_STATE;

const firstTime = (state) => state.merge({ firstTime: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_REQUEST]: request,
  [Types.RECOVER_REQUEST]: request,
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.OAUTH_REQUEST]: request,
  [Types.OAUTH_SUCCESS]: success,
  [Types.OAUTH_FAILURE]: failure,
  [Types.SEND_REQUEST]: request,
  [Types.LOGOUT]: logout,
  [Types.FIRST_TIME]: firstTime,
});

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = (loginState) => loginState.username !== null;
