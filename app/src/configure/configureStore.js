import promiseMiddlware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import asyncAwaitMiddleware from 'redux-async-await';
import {applyMiddleware, createStore, compose} from 'redux';
import {navigationMiddleware} from 'truefit-navigation';

const rootReducer = () => require('../rootReducer').default; // eslint-disable-line

const createProductionStore = middleware =>
  createStore(rootReducer(), applyMiddleware(...middleware));

const createDevStore = middleware => {
  const appJson = require('../../app.json');
  const devTools = require('remote-redux-devtools').default;
  const enhancer = compose(
    applyMiddleware(...middleware),
    devTools({name: appJson.displayName, realtime: true}),
  );

  const store = createStore(rootReducer(), enhancer);

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept(() => {
      store.replaceReducer(rootReducer());
    });
  }

  return store;
};

export default () => {
  const middleware = [
    thunkMiddleware,
    promiseMiddlware,
    asyncAwaitMiddleware,
    navigationMiddleware,
  ];

  return __DEV__ // eslint-disable-line
    ? createDevStore(middleware)
    : createProductionStore(middleware);
};
