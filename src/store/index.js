import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import {createLogicMiddleware} from 'redux-logic';
import {enableBatching} from 'redux-batched-actions';
import {persistStore, persistReducer} from 'redux-persist';
import http from '../lib/http';
import _ from 'lodash';
import localForage from 'localforage';

import createHistory from 'history/createBrowserHistory';

import {routerReducer, routerMiddleware} from 'react-router-redux';

const logicDependancies = {
  http,
};

const logicMiddleware = createLogicMiddleware([
], logicDependancies);

export const history = createHistory();

const middleware = applyMiddleware(
  logicMiddleware,
  routerMiddleware(history),
);

const enhancer = compose(middleware);

const reducer = persistReducer({
  key: 'root',
  storage: localForage,
  whitelist: [],
}, combineReducers({
  app: (state = {}, action) => state
}));

const store = createStore(
  enableBatching(reducer),
  enhancer
);

export const persistor = persistStore(store);
export default store;