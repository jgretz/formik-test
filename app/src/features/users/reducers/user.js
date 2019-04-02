import {stateReducer} from 'truefit-redux-utils';
import {USER_LOGIN} from '../actions';

export default stateReducer(null, {
  [USER_LOGIN]: (_, payload) => payload,
});
