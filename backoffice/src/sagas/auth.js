import { put, call, takeLatest } from 'redux-saga/effects';
import Router from 'next/router';
import { signIn, signOut, refreshToken } from 'services/auth';
import { Types, Creators } from 'store/ducks/auth';
import { handleErrors, successMessage } from 'utils';
import { store } from '../store';

const { setLoading } = Creators;

function* watchSignIn(payload) {
  const { user: userData } = payload;
  yield put(setLoading(true));

  try {
    const response = yield call(signIn, userData);
    const { status, data } = response;

    yield put(Creators.signIn(data.token, userData.remember));
    yield put(Creators.setUserData(data.user));

    successMessage('Seja bem vindo!');

    yield Router.push('/');
  } catch (e) {
    yield call(handleErrors, e.response.data);
  }

  yield put(setLoading(false));
}

function* watchSignOut() {
  yield put(setLoading(true));

  signOut();

  yield put(Creators.signOut());

  yield put(setLoading(false));
  yield Router.push('/login');
}

function* watchRefreshToken() {
  const state = store.getState();

  try {
    const response = yield call(refreshToken, state.authReducer.remember);
    const { status, data } = response;
    yield put(Creators.signIn(data.token, state.authReducer.remember));
  } catch (e) {
    signOut();
    yield put(Creators.signOut());
    yield Router.push('/login');
  }
}

function* sagaAuth() {
  yield takeLatest(Types.LOGIN, watchSignIn);
  yield takeLatest(Types.LOGOUT, watchSignOut);
  yield takeLatest(Types.REFRESH_TOKEN, watchRefreshToken);
}

export default sagaAuth;
