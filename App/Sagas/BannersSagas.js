import { call, put } from 'redux-saga/effects';
import BannersActions from '../Redux/BannersRedux';

export function* getBanners(api) {
  // const { data } = action;
  // make the call to the api
  const response = yield call(api.getBanners);
  // success?
  if (response.ok) {
    yield put(BannersActions.bannersSuccess(response.data));
  } else {
    yield put(BannersActions.bannersFailure());
  }
}
