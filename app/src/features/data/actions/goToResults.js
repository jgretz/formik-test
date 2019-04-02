import {NavigationActions} from 'react-navigation';
import {RESULTS} from '../../../routes';

export const DATA2_COMPLETED = 'DATA2_COMPLETED';

export const goToResults = data2 => dispatch => {
  dispatch({
    type: DATA2_COMPLETED,
    payload: data2,
  });

  dispatch(NavigationActions.navigate({routeName: RESULTS}));
};
