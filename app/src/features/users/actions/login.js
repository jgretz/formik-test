import {startWizard} from '../../data/actions';

export const USER_LOGIN = 'USER_LOGIN';

export const login = (email, password) => dispatch => {
  if (password.length === 0) {
    return;
  }

  dispatch({
    type: USER_LOGIN,
    payload: {
      email,
    },
  });

  dispatch(startWizard());
};
