import {createSwitchNavigator} from 'react-navigation';
import {configureNavigation} from 'truefit-navigation';

// import route names
import {ONE, TWO} from '../routes';

// import components
import {One, Two} from '../features/shared/components';

// create routeConfiguration
export const routeConfig = {
  [ONE]: {screen: One},
  [TWO]: {screen: Two},
};

// create navigator config
export const navigatorConfig = {};

// config
export default () => {
  configureNavigation(createSwitchNavigator, routeConfig, navigatorConfig, ONE);
};
