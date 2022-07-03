import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
// import { filter } from 'ramda';
// import { startsWith } from 'ramdasauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  search: ['searchTerm', 'category'],
  searchSuccess: ['results'],
  searchFailure: null,
  cancelSearch: null,
});

export const SearchTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  searchOpen: false,
  searchTerm: '',
  category: null,
  results: null,
  searching: false,
});

/* ------------- Reducers ------------- */

export const performSearch = (state, { searchTerm, category }) =>
  state.merge({ searching: true, searchOpen: true, searchTerm, category, results: null });

const success = (state, { results }) => state.merge({ searching: false, results });
const failure = (state, { error }) => state.merge({ searching: false, error, results: null });

const cancelSearch = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH]: performSearch,
  [Types.SEARCH_SUCCESS]: success,
  [Types.SEARCH_FAILURE]: failure,
  [Types.CANCEL_SEARCH]: cancelSearch
});
