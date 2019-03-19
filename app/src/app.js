import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedNavigator} from 'truefit-navigation';

import {configureStore, configureHttp, configureNavigation} from './configure';

// spin up
configureNavigation();

const store = configureStore();
configureHttp(store);

// app
export default () => (
  <Provider store={store}>
    <ConnectedNavigator />
  </Provider>
);
