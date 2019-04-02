import produce from 'immer';
import {stateReducer} from 'truefit-redux-utils';

import {USER_LOGIN} from '../../users/actions';
import {DATA1_COMPLETED, DATA2_COMPLETED, RESET_DATA} from '../actions';

const INITIAL = {
  email: '',
  firstName: '',
  lastName: '',
  favMovie: '',
  favFood: '',
};

export default stateReducer(INITIAL, {
  [USER_LOGIN]: (state, payload) =>
    produce(state, draft => {
      draft.email = payload.email;
    }),

  [DATA1_COMPLETED]: (state, payload) =>
    produce(state, draft => {
      draft.firstName = payload.firstName;
      draft.lastName = payload.lastName;
    }),

  [DATA2_COMPLETED]: (state, payload) =>
    produce(state, draft => {
      draft.favMovie = payload.favMovie;
      draft.favFood = payload.favFood;
    }),

  [RESET_DATA]: state => produce(state, () => INITIAL),
});
