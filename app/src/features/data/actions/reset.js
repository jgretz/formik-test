import {NavigationActions, StackActions} from 'react-navigation';
import {LOGIN} from '../../../routes';

export const RESET_DATA = 'RESET_DATA';

export const reset = () => dispatch => {
  dispatch({
    type: RESET_DATA,
  });

  dispatch(StackActions.popToTop());
  dispatch(NavigationActions.navigate({routeName: LOGIN}));
};
