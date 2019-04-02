/* eslint-disable sort-imports */
import {combineReducers} from 'redux';
import {createNavigationReducer} from 'truefit-navigation';
import users from './features/users/reducers';

const rootReducer = combineReducers({
  navigation: createNavigationReducer(),
  features: combineReducers({
    users,
  }),
});

export default rootReducer;
