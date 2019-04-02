/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {createNavigationReducer} from 'truefit-navigation';
import data from './features/data/reducers';
import users from './features/users/reducers';

const rootReducer = combineReducers({
  navigation: createNavigationReducer(),
  features: combineReducers({
    data,
    users,
  }),
});

export default rootReducer;
