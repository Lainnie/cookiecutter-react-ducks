import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import authReducers, { authRemotes, authOperations } from '../auth';

const rootSaga = function* concatSagas() {
  return yield [...authRemotes];
};

const reducer = combineReducers({
  auth: authReducers,
  form: formReducer,
});

const sagaMiddleware = createSagaMiddleware();
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

store.dispatch(authOperations.alreadyLoggedIn());

export default store;
