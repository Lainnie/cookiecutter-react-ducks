import { combineReducers } from 'redux';

/**
 * Action Types
 */
const module = 'auth';

export const actionTypes = {
  LOGIN: `${module}/LOGIN`,
  LOGIN_SUCCESS: `${module}/LOGIN_SUCCESS`,
  LOGIN_FAILURE: `${module}/LOGIN_FAILURE`,
  ALREADY_LOGGED_IN: `${module}/ALREADY_LOGGED_IN`,
};

/**
 * Reducers
 */
const loginState = {
  accessToken: '',
  username: '',
  accountId: '',
  error: false,
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      const { username, accessToken } = action.payload;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('username', username);

      return {
        ...state,
        accessToken,
        username,
        error: false,
      };
    }
    case actionTypes.ALREADY_LOGGED_IN: {
      const username = localStorage.getItem('username');
      const accessToken = localStorage.getItem('accessToken');

      return {
        ...state,
        accessToken,
        username,
      };
    }
    case actionTypes.LOGIN_FAILURE: {
      return {
        ...loginState,
        error: true,
      };
    }
    default:
      return state;
  }
};

export const initialStates = {
  login: loginState,
};

export const reducers = combineReducers({
  login: loginReducer,
});

/**
 * Operations
 */
const loginSuccess = ({ username, accessToken }) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: { username, accessToken },
});

const loginFailure = error => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: { error },
});

const login = (username, password) => ({
  type: actionTypes.LOGIN,
  payload: { username, password },
});

const alreadyLoggedIn = () => ({
  type: actionTypes.ALREADY_LOGGED_IN,
});

export const operations = {
  loginSuccess,
  loginFailure,
  login,
  alreadyLoggedIn,
};

/**
 * Selectors
 */
const getToken = state => state.auth.login.accessToken;
const getUsername = state => state.auth.login.username;
const getAccountId = state => state.auth.login.accountId;
const getSubmitError = state => state.auth.login.error;

export const selectors = {
  getAccountId,
  getUsername,
  getToken,
  getSubmitError,
};
