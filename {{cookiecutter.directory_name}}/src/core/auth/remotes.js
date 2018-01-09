import { call, put, takeLatest } from 'redux-saga/effects';

import { authOperations as _authOperations, authActionTypes } from '../auth';

const LOGIN_ENDPOINT = `${process.env.API_URL}/v1/login`;

const _loginRequest = (fetch, url, options) =>
  fetch(url, options).then(response => response.json());

const remotesBuilder = ({ authOperations, fetch, loginRequest }) => ({
  login: function* login(action) {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      const options = {
        method: 'POST',
        body: JSON.stringify({ ...action.payload }),
        headers,
      };
      const response = yield call(loginRequest, fetch, LOGIN_ENDPOINT, options);

      yield put(
        authOperations.loginSuccess({
          username: action.payload.username,
          accessToken: response,
        })
      );
    } catch (e) {
      yield put(authOperations.loginFailure(e));
    }
  },
});

const remotes = remotesBuilder({
  authOperations: _authOperations,
  fetch,
  loginRequest: _loginRequest,
});

export { remotesBuilder };

export default [takeLatest(authActionTypes.LOGIN, remotes.login)];
