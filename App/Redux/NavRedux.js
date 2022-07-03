import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  navRoute: ['route', 'params'],
});

export const NavTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  rout: null,
  params: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const setRoute = (state, { route, params }) => state.merge({ route, params });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NAV_ROUTE]: setRoute,
});
