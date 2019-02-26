import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedNavigator} from 'truefit-navigation';

import {configureStore, configureHttp, configureNavigation} from './configure';

export default class App extends Component {
  constructor(props) {
    super(props);

    configureNavigation();

    const store = configureStore();
    configureHttp(store);

    // this change seemed to come around 0.54.0 - basically this needs to be part of state so it can last past the HMR load of the file
    this.state = {store};
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <ConnectedNavigator />
      </Provider>
    );
  }
}
