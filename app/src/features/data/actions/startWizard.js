import {NavigationActions} from 'react-navigation';
import {WIZARD} from '../../../routes';

export const startWizard = () =>
  NavigationActions.navigate({routeName: WIZARD});
