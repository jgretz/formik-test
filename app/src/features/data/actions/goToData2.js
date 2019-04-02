import {NavigationActions} from 'react-navigation';
import {DATA2} from '../../../routes';

export const DATA1_COMPLETED = 'DATA1_COMPLETED';

export const goToData2 = data1 => dispatch => {
  dispatch({
    type: DATA1_COMPLETED,
    payload: data1,
  });

  dispatch(NavigationActions.navigate({routeName: DATA2}));
};
