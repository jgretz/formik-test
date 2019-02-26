/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {createNavigationReducer} from 'truefit-navigation';
import shared from './features/shared/reducers';

const rootReducer = combineReducers({
  navigation: createNavigationReducer(),
  features: combineReducers({
    shared,
  }),
});

export default rootReducer;
