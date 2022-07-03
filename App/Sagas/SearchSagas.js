import { call, put } from 'redux-saga/effects';
import SearchActions from '../Redux/SearchRedux';

export function* search(api, action) {
  const { searchTerm, category } = action;
  // make the call to the api
  const response = yield call(api.getSearch, { searchTerm, category });
  // success?
  if (response.ok) {
    yield put(SearchActions.searchSuccess(response.data));
  } else {
    yield put(SearchActions.searchFailure());
  }
}
