import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null,
  net: ['online'],
});

export const StartupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({ 
  rehidrated: false,
  online: true,
  cities: require('../Fixtures/cities.json')
});

/* ------------- Reducers ------------- */

//export
const startup = state => state.merge({ rehidrated: true });
const net = (state, { online }) => state.merge({ online });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
  [Types.NET]: net,
});
